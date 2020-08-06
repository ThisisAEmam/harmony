import React from "react";
import classes from "./EditorModal.module.css";
import { useDispatch } from "react-redux";
import { setModal } from "../../features/modalSlice";
import { useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";

const EditorModal = (props) => {
  const modalDispatch = useDispatch(setModal);

  const loginHandler = () => {
    modalDispatch(setModal({ shown: true, type: "login" }));
  };

  const history = useHistory();

  const goHomeHandler = () => {
    history.push("/");
  };

  return (
    <div className={classes.EditorModalPage}>
      <Modal />
      <div className={classes.EditorModalContainer}>
        <div className={classes.EditorModal}>
          <div className={classes.titleContainer}>
            <i className="fa fa-lock"></i>
            <p className={classes.title}>Editor is locked</p>
          </div>
          <p className={classes.body}>You seem that you are not logged in yet. Log in now to start magic.</p>
          <div className={classes.bottom}>
            <p className={classes.goHome} onClick={goHomeHandler}>
              Go home
            </p>
            <div className={classes.buttonContainer}>
              <div className={classes.button} onClick={loginHandler}>
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
