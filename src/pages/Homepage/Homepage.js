import React, { useEffect } from "react";
import classes from "./Homepage.module.css";
import Banner from "../../containers/Banner/Banner";
import Navbar from "../../containers/Navbar/Navbar";
import Features from "../../containers/Features/Features";
import Footer from "../../containers/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Modal from "../../components/Modal/Modal";
import { useHistory } from "react-router-dom";
import VideoSection from "../../containers/VideoSection/VideoSection";
import TeamSection from "../../containers/TeamSection/TeamSection";

const Homepage = (props) => {
  const { screen } = useSelector((state) => state);

  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Home"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (screen === "Mobile") {
      history.push("notAvailable");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  return (
    <div className={classes.Homepage}>
      <Modal />
      <Navbar />
      <Banner />
      <Features />
      <VideoSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Homepage;
