import React from "react";
import classes from "./Homepage.module.css";
import Banner from "../../containers/Banner/Banner";
import Navbar from "../../containers/Navbar/Navbar";
import Features from "../../containers/Features/Features";
import Footer from "../../containers/Footer/Footer";

const Homepage = (props) => {
  return (
    <div className={classes.Homepage}>
      <Navbar />
      <Banner />
      <Features />
      <Footer />
    </div>
  );
};

export default Homepage;
