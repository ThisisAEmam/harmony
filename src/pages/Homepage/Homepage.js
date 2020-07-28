import React, { useEffect } from "react";
import classes from "./Homepage.module.css";
import Banner from "../../containers/Banner/Banner";
import Navbar from "../../containers/Navbar/Navbar";
import Features from "../../containers/Features/Features";
import Footer from "../../containers/Footer/Footer";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";

const Homepage = (props) => {
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Home"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
