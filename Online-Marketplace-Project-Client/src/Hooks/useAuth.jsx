import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import toast from "react-hot-toast";
import { useState } from "react";

const useAuth = () => {
  const axios = useAxios();
  const [auth, setAuth] = useState(async (user, msg) => {
    await axios.post("/token", user);
    toast.success(`successful ${msg} !`);
  })
  return auth;
};

export default useAuth;
