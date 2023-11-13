import React from "react";
import Banner from "../../Components/Banner/Banner";
import TabsContent from "../../Components/Tabs/TabsContent";
import ContactUs from "../../Components/ContactUs/ContactUs";
import UserTestimonials from "../../Components/UserTestimonials/UserTestimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>O.M.P | Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner />
      <TabsContent/>
      <UserTestimonials/>
      <ContactUs />
    </div>
  );
};

export default Home;
