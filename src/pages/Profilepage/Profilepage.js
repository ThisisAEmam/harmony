import React, { useEffect, useState } from "react";
import classes from "./Profilepage.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Footer from "../../containers/Footer/Footer";
import Layout from "../../hoc/Layout/Layout";

const Profilepage = (props) => {
  const sidebarArr = ["General info", "Previous workspaces", "Change my password", "Delete my account"];
  const [activePanel, setActivePanel] = useState(0);
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelClickHandler = (index) => {
    setActivePanel(index);
  };

  return (
    <div className={classes.Profilepage}>
      <Navbar />
      <Layout>
        <div className={classes.container}>
          <div className={classes.sidebar}>
            <ul>
              {sidebarArr.map((item, index) => (
                <li
                  key={index}
                  className={[classes.sidebarPanel, activePanel === index ? classes.activeSidebarPanel : null].join(" ")}
                  onClick={() => panelClickHandler(index)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.mainArea}>Hello</div>
        </div>
      </Layout>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Profilepage;
