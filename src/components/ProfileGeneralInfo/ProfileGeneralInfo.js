import React, { useState, useEffect } from "react";
import classes from "./ProfileGeneralInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../features/userDataSlice";

const ProfileGeneralInfo = (props) => {
  const { userData } = useSelector((state) => state);
  const dispatch = useDispatch(setUserData);
  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const changeClickHandler = (type, change) => {
    if (change) {
      if (type === "name") {
        setChangeName(true);
      } else if (type === "email") {
        setChangeEmail(true);
      }
    } else {
      if (type === "name") {
        setChangeName(false);
        setName(userData.name);
      } else if (type === "email") {
        setChangeEmail(false);
        setEmail(userData.email);
      }
    }
  };

  let date = userData.createdAt;
  let year = date.substr(0, 4);
  let month = date.substr(5, 2);
  let day = date.substr(8, 2);
  date = `${day}/${month}/${year}`;

  const changeSubmitHandler = (type) => {
    if (type === "name") {
      const temp = { ...userData };
      temp.name = name;
      dispatch(setUserData(temp));
      setChangeName(false);
    } else if (type === "email") {
      const temp = { ...userData };
      temp.email = email;
      dispatch(setUserData(temp));
      setChangeEmail(false);
    }
  };

  return (
    <div className={classes.mainAreaContainer}>
      <div className={classes.mainAreaRow}>
        <label>Name:</label>
        <input type="text" value={name} disabled={!changeName} onChange={(text) => setName(text.target.value)} />
        {changeName ? (
          <div className={classes.icons}>
            <i className="fa fa-check" onClick={() => changeSubmitHandler("name")}></i>
            <i className="fa fa-times" onClick={() => changeClickHandler("name", false)}></i>
          </div>
        ) : (
          <p className={classes.changeBtn} onClick={() => changeClickHandler("name", true)}>
            change
          </p>
        )}
      </div>
      <div className={classes.mainAreaRow}>
        <label>Email:</label>
        <input type="text" value={email} disabled={!changeEmail} onChange={(text) => setEmail(text.target.value)} />
        {changeEmail ? (
          <div className={classes.icons}>
            <i className="fa fa-check" onClick={() => changeSubmitHandler("email")}></i>
            <i className="fa fa-times" onClick={() => changeClickHandler("email", false)}></i>
          </div>
        ) : (
          <p className={classes.changeBtn} onClick={() => changeClickHandler("email", true)}>
            change
          </p>
        )}
      </div>
      <div className={classes.mainAreaRow}>
        <p>Creation date:</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ProfileGeneralInfo;
