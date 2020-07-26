import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const navItemsArr = ["Home", "Editor", "Docs"];
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.pageYOffset > 100 ? setScrolled(true) : setScrolled(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  return (
    <div className={[classes.Navbar, isScrolled ? classes.scrolled : null].join(" ")}>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.logo}>
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <ul>
            {navItemsArr.map((navItem, index) => (
              <li key={index}>{navItem}</li>
            ))}
          </ul>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.login}>
            <i className="fa fa-unlock-alt"></i>
            <p>Login</p>
          </div>
          <div className={classes.signupContainer}>
            <div className={classes.signup}>
              <i className="fa fa-user-plus"></i>
              <p>Signup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
