import React, { useState, useEffect } from "react";
import classes from "./ProfileChangePassword.module.css";

const ProfileChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (currentPassword.length !== 0 && newPassword.length !== 0 && confirmPassword.length !== 0) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <div className={classes.mainAreaContainer}>
      <div className={classes.mainAreaRow}>
        <label>Current password:</label>
        <input type="password" value={currentPassword} onChange={(text) => setCurrentPassword(text.target.value)} />
      </div>
      <div className={classes.mainAreaRow}>
        <label>New password:</label>
        <input type="password" value={newPassword} onChange={(text) => setNewPassword(text.target.value)} />
      </div>
      <div className={classes.mainAreaRow}>
        <label>Confirm new password:</label>
        <input type="password" value={confirmPassword} onChange={(text) => setConfirmPassword(text.target.value)} />
      </div>
      <div className={classes.mainAreaRow}>
        <div className={[classes.submitBtn, enabled ? classes.enabled : null].join(" ")}>Submit changes</div>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
