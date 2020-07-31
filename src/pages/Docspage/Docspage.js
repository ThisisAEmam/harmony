import React, { useEffect } from "react";
import classes from "./Docspage.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Layout from "../../hoc/Layout/Layout";

const Docspage = (props) => {
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Docs"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.Docspage}>
      <Navbar />
      <Layout>Hello from Docs</Layout>
    </div>
  );
};

export default Docspage;
