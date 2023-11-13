import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://online-marketplace-project-server.vercel.app/api",
  withCredentials: true,
});

const useAxios = () => {
  const navigate = useNavigate()
  useEffect(() => {
    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if(error.response.status === 400){

          navigate("/login")
        }
        // console.log(error);
      }
    );
  }, []);
  return instance;
};

export default useAxios;
