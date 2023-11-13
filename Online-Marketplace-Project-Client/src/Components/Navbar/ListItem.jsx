import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const LiItem = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
            : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
        }
      >
        <span className="flex justify-center font-medium text-lg">Home</span>
      </NavLink>
      <NavLink
        to="/add-job"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
            : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
        }
      >
        <span className="flex justify-center font-medium text-lg">Add Job</span>
      </NavLink>
      <NavLink
        to="/posted-job"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
            : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
        }
      >
        <span className="flex justify-center font-medium text-lg">Posted Job</span>
      </NavLink>
      <NavLink
        to="/my-bids"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
            : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
        }
      >
        <span className="flex justify-center font-medium text-lg">My Bids</span>
      </NavLink>
      <NavLink
        to="/bids-request"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
            : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
        }
      >
        <span className="flex justify-center font-medium text-lg">Bids Request</span>
      </NavLink>
    </>
  );
};

export default LiItem;
