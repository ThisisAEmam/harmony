import React, { useEffect } from "react";
import classes from "./Profilepage.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Layout from "../../hoc/Layout/Layout";

const Profilepage = (props) => {
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.Profilepage}>
      <Navbar />
      <Layout>Hello from Profile.</Layout>
    </div>
  );
};

export default Profilepage;
