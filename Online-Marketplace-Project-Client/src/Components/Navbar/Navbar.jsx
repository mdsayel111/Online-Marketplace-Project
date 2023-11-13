import { NavLink, useNavigate } from "react-router-dom";
import Drawer from "../Drawer/Drawer";
import LiItem from "./ListItem";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import "./Navbar.css";
import useAxios from "../../Hooks/useAxios"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const axios = useAxios()

  const handleLogOut = async () => {
    await logOut();
    await axios.get("/logout")
  };

  return (
    <div>
      <nav className="sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div className="flex items-center text-gray-900">
          <a className="mr-4 cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased flex">
            <img
              src="https://i.ibb.co/gR99gGH/logo.png"
              className="w-8 md:w-10 lg:w-10 mr-2 lg:mr-4"
            />
            <h3 className="text-primary  lg:block text-lg md:text-xl lg:text-2xl font-bold">
              Online Marketplace
            </h3>
          </a>
          <ul className="ml-auto mr-8 hidden items-center gap-6 lg:flex">
            {user ? (
              <>
                <LiItem />
                <div className="drop-dawn relative">
                  <img
                    className="w-12 cursor-pointer img rounded-full"
                    data-ripple-light="true"
                    data-popover-target="menu"
                    src={user.photoURL}
                    onError={function (e) {
                      e.target.src = "https://i.ibb.co/JRxby70/User.jpg";
                    }}
                  ></img>
                  <ul
                    role="menu"
                    data-popover="menu"
                    data-popover-placement="bottom"
                    className={`drop-dawn-menu absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none -top-48 -right-10`}
                  >
                    <p className="text-center text-primary">
                      {user.displayName}
                    </p>
                    <li
                      role="menuitem"
                      className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <button
                        onClick={handleLogOut}
                        className="mb-2 block w-full rounded-lg bg-gradient-to-tr from-primary to-secondary py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                      >
                        <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
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
                  <span className="flex justify-center font-medium text-lg">
                    Home
                  </span>
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
                      : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
                  }
                >
                  <span className="flex justify-center font-medium text-lg">
                    LogIn
                  </span>
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased active"
                      : "block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased"
                  }
                >
                  <span className="flex justify-center font-medium text-lg">
                    Register
                  </span>
                </NavLink>
              </>
            )}
          </ul>
          {/* <button
            className="middle none center hidden rounded-lg bg-gradient-to-tr from-primary to-secondary py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
            data-ripple-light="true"
          >
            <span>Buy Now</span>
          </button> */}
          <div
            className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            data-collapse-target="sticky-navar"
          >
            <Drawer />
          </div>
        </div>
        <div
          className="block h-0 w-full basis-full overflow-hidden text-blue-gray-900 transition-all duration-300 ease-in lg:hidden"
          data-collapse="sticky-navar"
        >
          <ul className="mt-2 mb-4 flex flex-col gap-2 pb-2">
            <LiItem />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
