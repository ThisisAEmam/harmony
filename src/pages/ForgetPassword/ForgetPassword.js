import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import classes from "./ForgetPassword.module.css";
import axios from "axios";
import { useSpring, animated, config } from "react-spring";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);
  const [confirmRedirect, setConfirmRedirect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  const showRedirectSpring = useSpring({
    opacity: showRedirect ? 1 : 0,
    config: config.gentle,
  });

  const submitHandler = () => {
    axios
      .post("/forget", { email: email })
      .then((res) => {
        setShowRedirect(true);
        setInterval(() => {
          setShowRedirect(false);
          setConfirmRedirect(true);
        }, 5000);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <div className={classes.ForgetPasswordPage}>
      <animated.div style={showRedirectSpring} className={classes.redirectText}>
        Email has been sent successfully. You will be redirected to the homepage in <span>5 seconds</span>.
      </animated.div>
      <div className={classes.ForgetPasswordContainer}>
        <div className={classes.ForgetPassword}>
          <p className={classes.title}>Forget Password</p>
          <input
            type="email"
            id="emailInput"
            placeholder="Please enter your email"
            value={email}
            onChange={(text) => {
              setError(false);
              setEmail(text.target.value);
            }}
          />
          <p className={[classes.errorText, error ? classes.showText : null].join(" ")}>Email doesn't exist.</p>
          <div className={[classes.buttonContainer, disabled ? classes.disabled : null].join(" ")}>
            <div className={classes.button} onClick={submitHandler}>
              Submit changes
            </div>
          </div>
        </div>
      </div>
      {confirmRedirect ? <Redirect to="/" /> : null}
    </div>
  );
};

export default ForgetPassword;
