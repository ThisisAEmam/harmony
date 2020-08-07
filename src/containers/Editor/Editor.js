import React from "react";
import classes from "./Editor.module.css";
import Navbar from "../Navbar/Navbar";

const Editor = (props) => {
  return (
    <div className={classes.Editor}>
      <Navbar />
      <p>Welcome to Editor</p>
    </div>
  );
};

export default Editor;
