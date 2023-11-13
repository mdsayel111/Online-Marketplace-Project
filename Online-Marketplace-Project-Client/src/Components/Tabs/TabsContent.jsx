import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab, Tabs as TabsContent, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxios from "../../Hooks/useAxios";
import JobCard from "../JobCard/JobCard";
import Lottie from "lottie-react";
import Loading from "../../AnimationJson/Loading.json";

const TabsComponent = () => {
  const [tab, setTsb] = useState("Web Developer");
  const axios = useAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs",tab],
    queryFn: async () => {
      const res = await axios.get(`/jobs/${tab}`);
      const data = res.data;
      return data;
    },
  });

  // console.log(error);

  return (
    <div className="my-8">
      <TabsContent>
        <TabList className={"text-center"}>
          <Tab>
            <span
              onClick={() => setTsb("Web Developer")}
              className={`${
                tab === "Web Developer"
                  ? "bg-primary rounded-sm text-white block p-2"
                  : "bg-gray-300 rounded-sm text-black block p-2"
              }`}
            >
              Web Design
            </span>
          </Tab>
          <Tab>
            <span
              onClick={() => setTsb("Graphic Designer")}
              className={`${
                tab === "Graphic Designer"
                  ? "bg-primary rounded-sm text-white block p-2"
                  : "bg-gray-300 rounded-sm text-black block p-2"
              }`}
            >
              Graphic Design
            </span>
          </Tab>
          <Tab>
            <span
              onClick={() => setTsb("Digital Marketing")}
              className={`${
                tab === "Digital Marketing"
                  ? "bg-primary rounded-sm text-white block p-2"
                  : "bg-gray-300 rounded-sm text-black block p-2"
              }`}
            >
              Digital Marketing
            </span>
          </Tab>
        </TabList>

        {isLoading ? (
          <Lottie animationData={Loading}/>
        ) : (
          <>
            <TabPanel>
              <div className="grid w-fit mx-auto justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {tab === "Web Developer" &&
                  data?.map((jobDetails,index) => <JobCard key={index} jobDetails={jobDetails} />)}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid w-fit mx-auto justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {tab === "Graphic Designer" &&
                  data?.map((jobDetails, indx) => <JobCard key={indx} jobDetails={jobDetails} />)}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid w-fit mx-auto justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {tab === "Digital Marketing" &&
                  data?.map((jobDetails, indx) => <JobCard key={indx} jobDetails={jobDetails} />)}
              </div>
            </TabPanel>
          </>
        )}
      </TabsContent>
    </div >
  );
};

export default TabsComponent;
