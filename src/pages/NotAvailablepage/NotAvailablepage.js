import React, { useEffect } from "react";
import classes from "./NotAvailablepage.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";

const NotAvailablepage = (props) => {
  const dispatch = useDispatch(setCurrentPage);

  useEffect(() => {
    dispatch(setCurrentPage("Not Available"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.NotAvailablepage}>
      <div className={classes.body}>
        <img src="images/under_construction.png" alt="under_construction" />
        <h1>Mobile version is still under construction.</h1>
        <p>You can visit us again with your personal computer to start your magical tricks.</p>
      </div>
    </div>
  );
};

export default NotAvailablepage;
