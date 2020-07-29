import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../features/modalSlice";

const Navbar = (props) => {
  const navItemsArr = ["Home", "Editor", "Docs"];
  const [isScrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const { currentPage } = useSelector((state) => state);
  const modalDispatch = useDispatch(setModal);

  useEffect(() => {
    switch (currentPage) {
      case "Home":
        setActivePage(0);
        break;
      case "Editor":
        setActivePage(1);
        break;
      case "Docs":
        setActivePage(2);
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
    modalDispatch(setModal({ shown: true, type: type }));
  };

  return (
    <div className={[classes.Navbar, isScrolled ? classes.scrolled : null].join(" ")}>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.logo}>
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <ul>
            {navItemsArr.map((navItem, index) => (
              <li key={index} className={activePage === index ? classes.active : null}>
                {navItem}
              </li>
            ))}
          </ul>
        </div>
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
      </div>
    </div>
  );
};

export default Navbar;
