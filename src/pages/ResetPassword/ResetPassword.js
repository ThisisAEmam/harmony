import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import classes from "./ResetPassword.module.css";
import axios from "axios";
import { useSpring, animated, config } from "react-spring";

const ResetPassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [confirmRedirect, setConfirmRedirect] = useState(false);

  let { id, token } = useParams();

  useEffect(() => {
    if (newPassword.length >= 7 && confirmPassword.length >= 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newPassword, confirmPassword]);

  const showRedirectSpring = useSpring({
    opacity: showRedirect ? 1 : 0,
    config: config.gentle,
  });

  useEffect(() => {
    if (redirect) {
      const data = {
        id: id,
        token: token,
        password: newPassword,
      };
      axios
        .post("/reset", data)
        .then((res) => {
          console.log(res.data);
          setShowRedirect(true);
          setTimeout(() => {
            setShowRedirect(false);
            setConfirmRedirect(true);
          }, 5000);
        })
        .catch((error) => console.log(error));
    }
  }, [redirect]);

  const submitHandler = () => {
    if (newPassword === confirmPassword) {
      setRedirect(true);
      setError(false);
    } else {
      setRedirect(false);
      setError(true);
    }
  };

  return (
    <div className={classes.ResetPasswordPage}>
      <animated.div style={showRedirectSpring} className={classes.redirectText}>
        Your password has been changed successfully. You will be redirected to the homepage in <span>5 seconds</span>.
      </animated.div>
      <div className={classes.ResetPasswordContainer}>
        <div className={classes.ResetPassword}>
          <p className={classes.title}>Reset Password</p>
          <form>
            <div>
              <label htmlFor="newPass">
                New password:
                <br /> <span>(more than 7 characters)</span>
              </label>
              <input
                type="password"
                id="newPass"
                placeholder="New Password"
                value={newPassword}
                onChange={(text) => {
                  setError(false);
                  setNewPassword(text.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="confirmPass">
                Confirm new password:
                <br /> <span>(more than 7 characters)</span>
              </label>
              <input
                type="password"
                id="confirmPass"
                placeholder="Confirm new Password"
                value={confirmPassword}
                onChange={(text) => {
                  setError(false);
                  setConfirmPassword(text.target.value);
                }}
              />
            </div>
          </form>
          <p className={[classes.errorText, error ? classes.showText : null].join(" ")}>Passwords don't match.</p>
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

export default ResetPassword;
