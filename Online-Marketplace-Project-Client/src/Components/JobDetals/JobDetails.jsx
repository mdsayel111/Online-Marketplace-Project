import { useNavigate, useParams } from "react-router-dom";
import { milliSecondsTODate } from "../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import "./JobDetails.css";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useLoading from "../../Hooks/useLoading";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const Loading = useLoading();

  const { data, isLoading } = useQuery({
    queryKey: ["JobDetails"],
    queryFn: async () => {
      // console.log(params);
      const data = await axios.get(`/job/${params.id}`);
      return data.data;
    },
  });

  const {
    Email,
    _id,
    ImgUrl,
    JobTitle,
    MinPrice,
    MaxPrice,
    Description,
    Deadline,
    Category
  } = data || {};

  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const { email } = user;

  const disable = user.email === Email || Deadline <  Date.now() ? "disabled" : "";

  const hndleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bidderEmail = form.bidderEmail.value;
    const bidderPrice = form.bidderPrice.value;
    const bidderDeadline = startDate.getTime();
    const bidDetails = {
      bidderEmail,
      bidderPrice : parseInt(bidderPrice),
      bidderDeadline,
      Email,
      JobTitle,
      MinPrice,
      MaxPrice,
      Deadline,
      statusCode: 2,
      status: "pending",
      Category
    };
    if (
      bidderDeadline > Deadline ||
      bidderDeadline < new Date().getTime() ||
      bidderPrice > MaxPrice
    ) {
      
      return toast.error("your bidding price or your dealine is invalid !");
    }
    const result = await axios.post(`/bid/?userEmail=${user.email}`, bidDetails);
    toast.success("your bidding req send successful !");
    form.reset();
    navigate("/my-bids");
  };

  return (
    <>
      {isLoading ? (
        Loading
      ) : (
        <div>
          <div className="relative flex w-full justify-between flex-col lg:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md my-8">
            <div className="mx-auto w-full lg:w-1/2">
              <div className="relative w-full m-0 overflow-hidden mx-auto text-gray-700 bg-white lg:rounded-r-none shrink-0 rounded-xl bg-clip-border">
                <img
                  src={ImgUrl}
                  alt="image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h6 className="mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-primary uppercase flex items-center">
                  Psot by : <p className="text-gray-800 ml-4"> {Email}</p>
                </h6>
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {JobTitle}
                </h4>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {Description}
                </p>
                <div className="flex items-center" href="#">
                  <span className="text-primary font-semibold mr-2">
                    Deadline :
                  </span>
                  <p className="text-gray-700">
                    {milliSecondsTODate(Deadline)}
                  </p>
                </div>
                <div className="flex items-center" href="#">
                  <span className="text-primary font-semibold mr-2">
                    Price :
                  </span>
                  <p className="text-gray-700">
                    ${MinPrice} - {MaxPrice}
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex flex-row items-center mx-auto">
              <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none w-full">
                <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
                  Place Your Bid
                </h4>
                <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Enter details to Bid.
                </p>
                <form
                  onSubmit={hndleSubmit}
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4 flex flex-col gap-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        value={Email}
                        disabled
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Woner Email
                      </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        name="bidderEmail"
                        value={email}
                        disabled
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Your Email
                      </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        name="bidderPrice"
                        type="number"
                        min={0}
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Price
                      </label>
                    </div>
                    <div className="relative day-picker h-11 w-full min-w-[200px]">
                      <DatePicker
                      dateFormat="dd/MM/yyyy"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                  </div>
                  <button
                    disabled={disable}
                    type="submit"
                    className="mt-6 block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                  >
                    Bid on the project
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
