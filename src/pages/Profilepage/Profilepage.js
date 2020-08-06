import React, { useEffect, useState } from "react";
import classes from "./Profilepage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPage } from "../../features/currentPageSlice";
import Navbar from "../../containers/Navbar/Navbar";
import Footer from "../../containers/Footer/Footer";
import Layout from "../../hoc/Layout/Layout";
import ProfileGeneralInfo from "../../components/ProfileGeneralInfo/ProfileGeneralInfo";
import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
import ProfileDeleteAccount from "../../components/ProfileDeleteAccount/ProfileDeleteAccount";

const Profilepage = (props) => {
  const { isLoggedIn } = useSelector((state) => state);
  const sidebarArr = ["General info", "Change my password", "Delete my account"];
  const [activePanel, setActivePanel] = useState(1);
  const dispatch = useDispatch(setCurrentPage);
  useEffect(() => {
    dispatch(setCurrentPage("Profile"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
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
      content = <ProfileChangePassword />;
      break;
    case 2:
      content = <ProfileDeleteAccount />;
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
