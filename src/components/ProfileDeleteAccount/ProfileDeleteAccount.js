import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../features/loggedInSlice";
import classes from "./ProfileDeleteAccount.module.css";
import axios from "axios";
import { useSpring, useChain, animated, config } from "react-spring";

const ProfileDeleteAccount = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const loginDispatch = useDispatch(setLoggedIn);

  const deleteClickHandler = () => {
    setOpenModal(true);
  };

  const wrapperRef = useRef();
  const cancelRef = useRef();
  const modalWrapperRef = useRef();
  const modalRef = useRef();

  const wrapperSpring = useSpring({
    ref: modalWrapperRef,
    opacity: openModal ? 1 : 0,
    pointerEvents: openModal ? "auto" : "none",
    config: config.gentle,
  });

  const modalSpring = useSpring({
    ref: modalRef,
    transform: openModal ? "scale(1)" : "scale(0)",
    // opacity: openModal ? 1 : 0,
    config: config.gentle,
  });

  useChain(openModal ? [modalWrapperRef, modalRef] : [modalRef, modalWrapperRef], [0, openModal ? 0.1 : 0.6]);

  const closeModal = (e) => {
    e.preventDefault();
    if (e.target === wrapperRef.current || e.target === cancelRef.current) {
      setOpenModal(false);
    }
  };

  const submitDeleteHandler = () => {
    setOpenModal(false);
    let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete("/users/me", config)
      .then((res) => {
        loginDispatch(setLoggedIn(false));
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("token");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={classes.mainAreaContainer}>
        <div className={classes.title}>
          <i className="fa fa-exclamation-triangle"></i>
          <p>Attention</p>
        </div>
        <div className={classes.body}>
          <p>
            Deleting your account will also delete all of your personal data and previous workspaces permenantly as well. You will not be able to restore them
            afterwards.
          </p>
          <p>
            <span>Warning: </span>proceeding in deletion process is at your own risk.
          </p>
        </div>
        <div className={classes.btn} onClick={deleteClickHandler}>
          Delete permenantly
        </div>
      </div>
      <animated.div ref={wrapperRef} style={wrapperSpring} className={classes.modalWrapper} onClick={closeModal}>
        <animated.div style={modalSpring} className={classes.modal}>
          <p className={classes.modalTitle}>Confirming account deletion</p>
          <p className={classes.modalBody}>Are you sure you want to delete your account?</p>
          <div className={classes.buttons}>
            <p className={classes.cancel} ref={cancelRef} onClick={closeModal}>
              Cancel
            </p>
            <p className={classes.yes} onClick={submitDeleteHandler}>
              Yes
            </p>
          </div>
        </animated.div>
      </animated.div>
    </>
  );
};

export default ProfileDeleteAccount;
