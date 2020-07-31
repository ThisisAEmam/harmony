import React, { useEffect } from "react";
import classes from "./Editorpage.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";

const Editorpage = (props) => {
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Editor"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.Editorpage}>
      <Navbar />
      Hello from Editor
    </div>
  );
};

export default Editorpage;
