import React, { useState, useEffect } from "react";
import classes from "./ProfileChangePassword.module.css";
import { useSpring, animated, config } from "react-spring";
import axios from "axios";

const ProfileChangePassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [reqError, setReqError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const spring = useSpring({
    opacity: showNotification ? 1 : 0,
    config: config.gentle,
  });

  useEffect(() => {
    if (newPassword.length >= 7 && confirmPassword.length >= 7) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [newPassword, confirmPassword]);

  const submitHandler = () => {
    if (newPassword === confirmPassword) {
      setError(false);
      let token = localStorage.getItem("token");
      const reqConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .patch("/users/me", { password: newPassword }, reqConfig)
        .then((res) => {
          setReqError(false);
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((err) => {
          setReqError(true);
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
          setNewPassword("");
          setConfirmPassword("");
        });
    } else {
      setError(true);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className={classes.mainAreaContainer}>
      <animated.div style={spring} className={[classes.notification, error || reqError ? classes.error : null].join(" ")}>
        {error ? "Passwords don't match. Please try again." : reqError ? "An error occurred. Please try again." : "Your password is changed successfully."}
      </animated.div>
      <div className={classes.mainAreaRow}>
        <label>New password:</label>
        <input type="password" placeholder="more than 7 characters" value={newPassword} onChange={(text) => setNewPassword(text.target.value)} />
      </div>
      <div className={classes.mainAreaRow}>
        <label>Confirm new password:</label>
        <input type="password" placeholder="more than 7 characters" value={confirmPassword} onChange={(text) => setConfirmPassword(text.target.value)} />
      </div>
      <div className={classes.mainAreaRow}>
        <div className={[classes.submitBtn, enabled ? classes.enabled : null].join(" ")} onClick={submitHandler}>
          Submit changes
        </div>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
