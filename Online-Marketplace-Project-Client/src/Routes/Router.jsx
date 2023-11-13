import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LogIn from "../Components/LogIn/LogIn";
import Register from "../Components/Register/Register";
import JobDetails from "../Components/JobDetals/JobDetails";
import useAxios from "../Hooks/useAxios";
import AddJob from "../Components/AddJob/AddJob";
import PrivateRoute from "./PrivateRoute";
import PostedJobs from "../Components/PostedJobs/PostedJobs";
import UpdateJobs from "../Components/UpdateJobs/UpdateJobs";
import { MyBids } from "../Components/MyBids/MyBids";
import { BidsRequest } from "../Components/BidsRequest/BidsRequest";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/job/bid/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        // loader: ({ params }) => axios.get(`/job/${params.id}`),
      },
      {
        path: "/add-job",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/posted-job",
        element: (
          <PrivateRoute>
            <PostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/job/update/:id",
        element: (
          <PrivateRoute>
            <UpdateJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "bids-request",
        element: (
          <PrivateRoute>
            <BidsRequest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
