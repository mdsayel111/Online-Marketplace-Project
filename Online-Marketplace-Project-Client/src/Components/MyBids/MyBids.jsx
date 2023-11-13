import { Card, Typography } from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import useLoading from "../../Hooks/useLoading";
import { milliSecondsTODate } from "../../utils/utils";
import { Helmet } from "react-helmet-async";

export function MyBids() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const Loading = useLoading();
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("All");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myBids", sort, filter],
    queryFn: async () => {
      const res = await axios.get(
        `/bids/bid/?userEmail=${user.email}&sort=${sort}&filter=${filter}`
      );
      const data = res.data;
      return data;
    },
  });

  const handleComplete = async (id) => {
    await axios.put(`/bids/${id}?userEmail=${user.email}`, {
      status: "completed",
      statusCode: 4,
    });
    refetch();
  };

  return (
    <>
      <Helmet>
        <title>O.M.P | My Bids</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {isLoading ? (
        <>{Loading}</>
      ) : (
        <>
          <div className="flex gap-2">
            <div className="relative h-10 w-1/2 md:w-72 min-w-[200px] mt-6">
              <select
                defaultValue={sort}
                onChange={(e) => {
                  const value = e.target.value;
                  setSort(value);
                }}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Order
              </label>
            </div>
            <div className="relative h-10 w-1/2 md:w-72 min-w-[200px] mt-6">
              <select
                defaultValue={filter}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter(value);
                  e.target.setAttribute("selected", true);
                }}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="All">All</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Filter
              </label>
            </div>
          </div>
          {data.length > 0 ? (
            <>
              <Card className="h-full w-full overflow-scroll my-10">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th
                        // key={}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Job Title
                        </Typography>
                      </th>
                      <th
                        // key={}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Email
                        </Typography>
                      </th>
                      <th
                        // key={}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Deadline
                        </Typography>
                      </th>
                      <th
                        // key={}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Status
                        </Typography>
                      </th>
                      <th
                        // key={}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Complete Button
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      (
                        { JobTitle, Email, bidderDeadline, status, _id },
                        index
                      ) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";
                        console.log(JobTitle);
                        return (
                          <tr key={index}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {JobTitle}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {Email}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {milliSecondsTODate(bidderDeadline)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {status}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {
                                  <>
                                    <button
                                      onClick={() => handleComplete(_id)}
                                      disabled={
                                        status === "accepted" ? "" : "disabled"
                                      }
                                      className="mb-2 block w-[100px] rounded-lg bg-gradient-to-tr from-primary to-secondary py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                      type="button"
                                      data-ripple-light="true"
                                    >
                                      <span>complete</span>
                                    </button>
                                  </>
                                }
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
            </>
          ) : (
            <img
              src="https://i.ibb.co/MgvfPn2/No-Data-Found.jpg"
              className="w-[80%] mx-auto my-8"
            ></img>
          )}
        </>
      )}
    </>
  );
}
