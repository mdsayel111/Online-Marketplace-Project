import React, { useContext } from "react";
import { milliSecondsTODate } from "../../utils/utils";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { QueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Contexts/AuthProvider";

const PostedJobs = ({ data, refetch }) => {
  const {user} = useContext(AuthContext)
  const {
    Email,
    _id,
    ImgUrl,
    JobTitle,
    MinPrice,
    MaxPrice,
    Description,
    Deadline,
  } = data;

  const axios = useAxios()

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reslt = await axios.delete(`/job/${_id}?userEmail=${user.email}`);
        refetch()
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mx-auto flex flex-col lg:flex-row">
      <div className="relative w-full lg:w-2/5 m-0 overflow-hidden mx-auto text-gray-700 bg-white lg:rounded-r-none shrink-0 rounded-xl bg-clip-border">
        <img src={ImgUrl} alt="image" className="object-cover w-full h-full" />
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
          <span className="text-primary font-semibold mr-2">Deadline :</span>
          <p className="text-gray-700">{milliSecondsTODate(Deadline)}</p>
        </div>
        <div className="flex items-center" href="#">
          <span className="text-primary font-semibold mr-2">Price :</span>
          <p className="text-gray-700">
            ${MinPrice} - {MaxPrice}
          </p>
        </div>
        <div className="flex gap-6 mt-4">
          <Link
            to={`/job/update/${_id}`}
            className="middle none center rounded-lg bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Update
          </Link>
          <button
            onClick={handleDelete}
            className="middle none center rounded-lg bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;
