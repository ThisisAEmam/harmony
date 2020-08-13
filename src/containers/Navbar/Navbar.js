import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../features/modalSlice";
import { setLoggedIn } from "../../features/loggedInSlice";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
  const navItemsArr = ["Home", "Editor"];
  const [isScrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const { currentPage, isLoggedIn } = useSelector((state) => state);
  const modalDispatch = useDispatch(setModal);
  const loginDispatch = useDispatch(setLoggedIn);

  useEffect(() => {
    switch (currentPage) {
      case "Home":
        setActivePage(0);
        break;
      case "Editor":
        setActivePage(1);
        break;
      // case "Docs":
      //   setActivePage(2);
      //   break;
      case "Profile":
        setActivePage(3);
        break;
      default:
        setActivePage(null);
        break;
    }
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.pageYOffset > 100 ? setScrolled(true) : setScrolled(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  const loginSignupClickHandler = (type) => {
    if (type === "logout") {
      let token = localStorage.getItem("token");
      axios
        .post(
          "/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => console.log(err));
      loginDispatch(setLoggedIn(false));
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem("token");
      return;
    }
    modalDispatch(setModal({ shown: true, type: type }));
  };

  const history = useHistory();
  const location = useLocation();

  const navigationHandler = (navItem) => {
    let name = navItem.toLowerCase();
    if (name === "home") {
      name = "";
    }

    if (location.pathname !== `/${name}`) {
      history.push(`/${name}`);
    }
  };

  const profileClickHandler = () => {
    history.push("/profile");
  };

  const logoHandler = () => {
    history.push("/");
  };

  return (
    <div className={[classes.Navbar, isScrolled ? classes.scrolled : null, isLoggedIn ? classes.loggedIn : null, props.dark ? classes.dark : null].join(" ")}>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.logo}>
            <img src={props.dark ? "/images/logo-white.png" : "/images/logo.png"} alt="Logo" onClick={logoHandler} />
          </div>
          <ul>
            {navItemsArr.map((navItem, index) => (
              <li
                key={index}
                className={[activePage === index ? classes.active : null, props.dark ? classes.white : null].join(" ")}
                onClick={() => navigationHandler(navItem)}>
                {navItem}
              </li>
            ))}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className={classes.rightSide}>
            <div
              className={[
                classes.profile,
                activePage !== 0 ? classes.notHomeProfile : null,
                activePage === 3 ? classes.activeProfile : null,
                props.dark ? classes.whiteMyProfile : null,
              ].join(" ")}
              onClick={profileClickHandler}>
              <p>My profile</p>
            </div>
            <div
              className={[classes.logout, activePage !== 0 ? classes.notHomeLogout : null, props.dark ? classes.whiteLogout : null].join(" ")}
              onClick={() => loginSignupClickHandler("logout")}>
              <i className="fa fa-sign-out"></i>
              <p>Logout</p>
            </div>
          </div>
        ) : (
          <div className={classes.rightSide}>
            <div className={classes.login} onClick={() => loginSignupClickHandler("login")}>
              <i className="fa fa-unlock-alt"></i>
              <p>Login</p>
            </div>
            <div className={classes.signupContainer}>
              <div className={classes.signup} onClick={() => loginSignupClickHandler("signup")}>
                <i className="fa fa-user-plus"></i>
                <p>Join us</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
