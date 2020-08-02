import React, { useEffect, useState } from "react";
import classes from "./Profilepage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Footer from "../../containers/Footer/Footer";
import Layout from "../../hoc/Layout/Layout";

const Profilepage = (props) => {
  const sidebarArr = ["General info", "Previous workspaces", "Change my password", "Delete my account"];
  const [activePanel, setActivePanel] = useState(0);
  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const { userData } = useSelector((state) => state);
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelClickHandler = (index) => {
    setActivePanel(index);
  };

  const changeClickHandler = (type) => {
    if (type === "name") {
      setChangeName(true);
    } else if (type === "email") {
      setChangeEmail(true);
    }
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
          <div className={classes.mainArea}>
            <div className={classes.mainAreaContainer}>
              <div className={classes.mainAreaRow}>
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder={userData.name} disabled={!changeName} />
                {changeName ? (
                  <div className={classes.icons}>
                    <i className="fa fa-check"></i>
                    <i className="fa fa-times"></i>
                  </div>
                ) : (
                  <p className={classes.changeBtn} onClick={() => changeClickHandler("name")}>
                    change
                  </p>
                )}
              </div>
              <div className={classes.mainAreaRow}>
                <label htmlFor="name">Email:</label>
                <input type="text" placeholder={userData.email} disabled={true} />
                <p className={classes.changeBtn} onClick={() => changeClickHandler("email")}>
                  change
                </p>
              </div>
              <div className={classes.mainAreaRow}>
                <p>Creation date:</p>
                <p>20/07/2020</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Profilepage;
