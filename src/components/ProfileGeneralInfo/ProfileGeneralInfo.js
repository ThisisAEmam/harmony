import React, { useState, useEffect } from "react";
import classes from "./ProfileGeneralInfo.module.css";
import axios from "axios";

const ProfileGeneralInfo = (props) => {
  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeAge, setChangeAge] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [date, setDate] = useState("");

  let token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("/users/me", config)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
        setCreatedAt(res.data.createdAt);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeClickHandler = (type, change) => {
    if (change) {
      if (type === "name") {
        setChangeName(true);
      } else if (type === "email") {
        setChangeEmail(true);
      } else if (type === "age") {
        setChangeAge(true);
      }
    } else {
      if (type === "name") {
        setChangeName(false);
        setName("");
      } else if (type === "email") {
        setChangeEmail(false);
        setEmail("");
      } else if (type === "age") {
        setChangeAge(false);
        setAge(0);
      }
    }
  };

  useEffect(() => {
    let year = createdAt.substr(0, 4);
    let month = createdAt.substr(5, 2);
    let day = createdAt.substr(8, 2);
    setDate(`${day}/${month}/${year}`);
  }, [createdAt]);

  const changeSubmitHandler = (type) => {
    if (type === "name") {
      axios
        .patch("/users/me", { name: name }, config)
        .then((res) => res)
        .catch((err) => console.log(err));
      setChangeName(false);
    } else if (type === "email") {
      axios
        .patch("/users/me", { email: email }, config)
        .then((res) => res)
        .catch((err) => console.log(err));
      setChangeEmail(false);
    } else if (type === "age") {
      axios
        .patch("/users/me", { age: age }, config)
        .then((res) => res)
        .catch((err) => console.log(err));
      setChangeAge(false);
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
        <label>Age:</label>
        <input type="number" value={age} disabled={!changeAge} onChange={(text) => setAge(parseInt(text.target.value))} />
        {changeAge ? (
          <div className={classes.icons}>
            <i className="fa fa-check" onClick={() => changeSubmitHandler("age")}></i>
            <i className="fa fa-times" onClick={() => changeClickHandler("age", false)}></i>
          </div>
        ) : (
          <p className={classes.changeBtn} onClick={() => changeClickHandler("age", true)}>
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
