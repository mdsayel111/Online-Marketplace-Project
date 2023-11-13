import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

import PostedJobsCard from "../PostedJobsCard/PostedJobs";
import useLoading from "../../Hooks/useLoading";
import { Helmet } from "react-helmet-async";

const PostedJobs = () => {
  const axios = useAxios();
  const Loading = useLoading();
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["postedJobs"],
    queryFn: async () => {
      return (await axios.get(`/posted-jobs/?userEmail=${user.email}`)).data;
    },
  });

  return (
    <>
      <Helmet>
        <title>O.M.P | Posted Jobs</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {isLoading ? (
        <>{Loading}</>
      ) : (
        <>
          {data?.length === 0 ? (
            <img
              src="https://i.ibb.co/MgvfPn2/No-Data-Found.jpg"
              className="w-[80%] mx-auto my-8"
            ></img>
          ) : (
            <div className="my-8 space-y-6">
              {data.map((item) => (
                <PostedJobsCard key={item._id} data={item} refetch={refetch} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostedJobs;
