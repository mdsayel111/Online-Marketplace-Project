import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../AnimationJson/Loading.json";
import Lottie from "lottie-react";

const MainLayout = () => {
  const loading = useNavigation();


  return (
    <div className="max-w-[1200px] mx-auto">
      <Navbar />
      {loading.state === "loading" ? (
        <Lottie animationData={Loading} loop={true}></Lottie>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;
