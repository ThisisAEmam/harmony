import React, { useEffect, useState } from "react";
import classes from "./Profilepage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPage } from "../../features/currentPageSlice";
import { setUserData } from "../../features/userDataSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Footer from "../../containers/Footer/Footer";
import Layout from "../../hoc/Layout/Layout";
import ProfileGeneralInfo from "../../components/ProfileGeneralInfo/ProfileGeneralInfo";
import ProfilePrevWorkspaces from "../../components/ProfilePrevWorkspaces/ProfilePrevWorkspaces";

const Profilepage = (props) => {
  const { isLoggedIn } = useSelector((state) => state);
  const sidebarArr = ["General info", "Previous workspaces", "Change my password", "Delete my account"];
  const [activePanel, setActivePanel] = useState(0);
  const dispatch = useDispatch(setCurrentPage);
  const userDataDispatch = useDispatch(setUserData);
  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    // userDataDispatch(setUserData({ name: "AbdelRahman", email: "abdoemamofficial@gmail.com", token: "a516d8aw8d1asda8w" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
      userDataDispatch(setUserData({ name: "", email: "", token: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const panelClickHandler = (index) => {
    setActivePanel(index);
  };

  let content;

  switch (activePanel) {
    case 0:
      content = <ProfileGeneralInfo />;
      break;
    case 1:
      content = <ProfilePrevWorkspaces />;
      break;
    case 2:
      content = <ProfileGeneralInfo />;
      break;
    case 3:
      content = <ProfileGeneralInfo />;
      break;
    default:
      break;
  }

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
          <div className={classes.mainArea}>{content}</div>
        </div>
      </Layout>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Profilepage;
