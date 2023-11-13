import React, { useContext, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import "./Drawer.css";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { TiThMenu } from "react-icons/ti";
import LiItem from "../Navbar/ListItem";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

export default function DrawerPlacement() {
  const [openRight, setOpenRight] = React.useState(false);
  const { user, logOut } = useContext(AuthContext);
  const openDrawerRight = () => setOpenRight(true);
  const handleLogOut = async () => {
    await logOut();
    await axios.get("/logout")
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <div className="flex flex-wrap gap-4 w-full h-full">
            <Button className="p-0 w-full h-full" onClick={openDrawerRight}>
              <TiThMenu className="w-full h-full" />
            </Button>
          </div>
        </MenuHandler>
        <MenuList>
          <div className="bg-white relative">
            <div>
              <ul>
                {user ? (
                  <>
                    <div className="flex items-center mb-2 justify-center gap-4">
                      <img
                        className="w-12 cursor-pointer img rounded-full"
                        data-ripple-light="true"
                        data-popover-target="menu"
                        src={user.photoURL}
                        onError={function (e) {
                          e.target.src = "https://i.ibb.co/JRxby70/User.jpg";
                        }}
                      ></img>
                      <p className="text-center font-semibold text-primary">
                        {user.displayName}
                      </p>
                      
                    </div>
                    <hr />
                    <LiItem />
                    <button
                      onClick={handleLogOut}
                      className="mb-2 block w-full rounded-lg bg-gradient-to-tr from-primary to-secondary py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-light="true"
                    >
                      <span>Log Out</span>
                    </button>
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
            </div>
          </div>
        </MenuList>
      </Menu>
    </>
  );
}
