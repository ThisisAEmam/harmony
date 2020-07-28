import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const modalWrapperRef = React.createRef();

  return (
    <div ref={modalWrapperRef} className={classes.ModalWrapper}>
      <div className={classes.Modal}>
        <div className={classes.modalBody}>Hello World</div>
      </div>
    </div>
  );
};

export default Modal;
