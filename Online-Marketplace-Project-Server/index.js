const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { config } = require("localforage");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://online-marketplace-proje-e33d8.web.app",
      "http://localhost:5173",
      'https://online-marketplace-project.surge.sh'
    ],
    credentials: true,
  })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@online-marketplace-proj.mqqsjmp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const { token } = req.cookies;
    const isVerify = jwt.verify(
      token,
      process.env.SECRET,
      function (err, decoded) {
        if (decoded) {
          if (userEmail === decoded.email) return next();
        }
        res.status(400).send({ msg: "unathorize" });
      }
    );
  } catch (err) {
    res.send(err);
  }
};

async function run() {
  try {
    const Jobs = client.db("Online-Marketplace-Project").collection("Jobs");
    const Users = client.db("Online-Marketplace-Project").collection("Users");
    const Bids = client.db("Online-Marketplace-Project").collection("Bids");

    app.get("/api/jobs/:category", async (req, res) => {
      try {
        const { category } = req.params;
        const query = { Category: category };
        const result = await Jobs.find(query).toArray();
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.get("/api/job/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await Jobs.findOne(query);
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.get("/api/posted-jobs/", verifyToken, async (req, res) => {
      try {
        const { userEmail } = req.query;
        const result = await Jobs.find({ Email: userEmail }).toArray();
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.get("/api/bids/:param", verifyToken, async (req, res) => {
      try {
        const { userEmail, sort, filter } = req.query;
        console.log(filter);
        const { param } = req.params;
        let query = {};
        if (param === "bid") {
          query = { bidderEmail: userEmail };
        } else {
          query = { Email: userEmail };
        }

        if (filter !== "All") {
          query.Category = filter;
        }

        const result = await Bids.find(query)
          .sort({ statusCode: sort })
          .toArray();
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.get("/api/logout", async (req, res) => {
      try {
        res.clearCookie("token").send({});
      } catch (err) {
        res.send(err);
      }
    });

    app.post("/api/token", async (req, res) => {
      try {
        const user = req.body;
        const userInDb = await Users.findOne({ uid: user.uid });
        if (!userInDb) {
          const result = await Users.insertOne(user);
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
          expiresIn: "24h",
        });
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          })
          .send({ massage: "success" });
      } catch (err) {
        res.send(err);
      }
    });

    app.post("/api/bid/",verifyToken , async (req, res) => {
      try {
        const bidDetails = req.body;
        const result = await Bids.insertOne(bidDetails);
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.post("/api/add-job", verifyToken, async (req, res) => {
      try {
        const job = req.body;
        const result = await Jobs.insertOne(job);
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.put("/api/job/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params;
        const job = req.body;
        const updateDoc = {
          $set: {
            ...job,
          },
        };
        const result = await Jobs.updateOne(
          { _id: new ObjectId(id) },
          updateDoc
        );
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.put("/api/bids/:id", verifyToken, async (req, res) => {
      try {
        const { id } = req.params;
        const { status, statusCode } = req.body;
        const updateDoc = {
          $set: {
            status: status,
            statusCode: statusCode,
          },
        };
        const result = await Bids.updateOne(
          { _id: new ObjectId(id) },
          updateDoc
        );
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });

    app.delete("/api/job/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params;
        const result = await Jobs.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (err) {
        res.send(err);
      }
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
