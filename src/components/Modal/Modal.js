import React, { useEffect, useState, useRef } from "react";
import classes from "./Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, useChain, animated, config } from "react-spring";
import { setModal } from "../../features/modalSlice";
import { setLoggedIn } from "../../features/loggedInSlice";
import { setUserData } from "../../features/userDataSlice";
import axios from "axios";

const Modal = (props) => {
  const { modal } = useSelector((state) => state);
  const modalDispatch = useDispatch(setModal);
  const loginDispatch = useDispatch(setLoggedIn);
  const userDataDispatch = useDispatch(setUserData);
  const [show, setShow] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongConfirmPassword, setWrongConfirmPassword] = useState(false);
  const [submit, setSubmit] = useState(false);

  const wrapperRef = useRef();
  const loginRef = useRef();
  const cancelRef = useRef();
  const modalWrapperRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (modal.shown) {
      setShow(true);
      document.body.style.overflow = "hidden";
      window.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 27) {
          modalDispatch(setModal({ shown: false, type: "" }));
        }
      });
    } else {
      setShow(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      document.body.style.overflow = "visible";
    }
    setLoginClicked(false);
  }, [modal]);

  useEffect(() => {
    if (submit) {
      submitHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  const wrapperSpring = useSpring({
    ref: modalWrapperRef,
    opacity: show ? 1 : 0,
    pointerEvents: show ? "auto" : "none",
    config: config.gentle,
  });

  const modalSpring = useSpring({
    ref: modalRef,
    transform: show ? "scale(1)" : "scale(0)",
    // opacity: show ? 1 : 0,
    config: config.gentle,
  });

  useChain(show ? [modalWrapperRef, modalRef] : [modalRef, modalWrapperRef], [0, show ? 0.1 : 0.6]);

  const wrapperClickHandler = (e) => {
    e.preventDefault();
    if (e.target === wrapperRef.current || e.target === cancelRef.current) {
      modalDispatch(setModal({ shown: false, type: "" }));
    }
  };

  const inputHandler = (type, text) => {
    if (type === "email") {
      setEmail(text.target.value);
      setEmptyEmail(false);
      setWrongEmail(false);
    } else if (type === "password") {
      setPassword(text.target.value);
      setEmptyPassword(false);
    } else if (type === "name") {
      setName(text.target.value);
      setEmptyName(false);
    } else if (type === "confirmPassword") {
      setConfirmPassword(text.target.value);
      setEmptyConfirmPassword(false);
      setWrongConfirmPassword(false);
    }
  };

  const inputFocusHandler = (type) => {
    setLoginClicked(false);
    document.getElementById(type).addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        loginRef.current.click();
      }
    });
  };

  const loginClickHandler = () => {
    if (!loginClicked) {
      setLoginClicked(true);
      if (email === "") {
        setEmptyEmail(true);
      } else {
        setEmptyEmail(false);
        if (!email.includes("@") && !email.includes(".")) {
          setWrongEmail(true);
        } else {
          setWrongEmail(false);
        }
      }

      if (password === "") {
        setEmptyPassword(true);
      } else {
        setEmptyPassword(false);
      }

      if (modal.type === "signup") {
        if (name === "") {
          setEmptyName(true);
        } else {
          setEmptyName(false);
        }

        if (password.length < 7) {
          setWrongPassword(true);
        } else {
          setWrongPassword(false);
        }

        if (confirmPassword === "") {
          setEmptyConfirmPassword(true);
        } else {
          setEmptyConfirmPassword(false);
          if (confirmPassword !== password) {
            setWrongConfirmPassword(true);
          } else {
            setWrongConfirmPassword(false);
          }
        }
      }
      setSubmit(true);
    }
  };

  const submitHandler = () => {
    setSubmit(false);
    if (modal.type === "login") {
      if (!emptyEmail && !emptyPassword && !wrongEmail && !wrongPassword) {
        const sentData = {
          name,
          email,
          password,
        };
        loginDispatch(setLoggedIn(true));
        userDataDispatch(setUserData({ name: "Test", email: "Test", token: "awd1616ada968s4d" }));
        modalDispatch(setModal({ shown: false, type: "" }));
      }
    } else if (modal.type === "signup") {
      if (!emptyEmail && !emptyPassword && !emptyConfirmPassword && !emptyName && !wrongEmail && !wrongPassword && !wrongConfirmPassword) {
        const sentData = {
          name,
          email,
          password,
        };
        // axios
        //   .post("/users", sentData)
        //   .then((res) => {

        //   })
        //   .catch((error) => console.log(error));
        userDataDispatch(setUserData({ name: "Test", email: sentData.email, token: "awd1616ada968s4d" }));
        loginDispatch(setLoggedIn(true));
        modalDispatch(setModal({ shown: false, type: "" }));
      }
    }
  };

  const switchHandler = () => {
    const temp = { ...modal };
    if (modal.type === "login") {
      temp.type = "signup";
    } else {
      temp.type = "login";
    }
    modalDispatch(setModal(temp));
  };

  return (
    <animated.div ref={wrapperRef} style={wrapperSpring} className={classes.ModalWrapper} onClick={wrapperClickHandler}>
      <animated.div style={modalSpring} className={classes.Modal}>
        <div className={classes.title}>{modal.type === "login" ? "Login" : "Join us"}</div>
        <div className={classes.body}>
          {modal.type === "signup" ? (
            <div className={[classes.field, emptyName ? classes.showText : null].join(" ")}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name.length === 0 ? "" : name}
                placeholder="Enter your name"
                onChange={(text) => inputHandler("name", text)}
                onFocus={() => inputFocusHandler("name")}
              />
              <p className={classes.errorText}>No name is provided</p>
            </div>
          ) : null}
          <div className={[classes.field, emptyEmail || wrongEmail ? classes.showText : null].join(" ")}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email.length === 0 ? "" : email}
              placeholder="Enter your email"
              onChange={(text) => inputHandler("email", text)}
              onFocus={() => inputFocusHandler("email")}
            />
            <p className={classes.errorText}>{emptyEmail ? "No email is provided." : "Please enter a valid email."}</p>
          </div>
          <div className={[classes.field, emptyPassword || wrongPassword ? classes.showText : null].join(" ")}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password.length === 0 ? "" : password}
              placeholder={modal.type === "login" ? "Enter your password" : "Enter a password (more than 7 characters)"}
              onChange={(text) => inputHandler("password", text)}
              onFocus={() => inputFocusHandler("password")}
            />
            <p className={classes.errorText}>
              {emptyPassword
                ? "No password is provided."
                : modal.type === "signup"
                ? wrongPassword
                  ? "Password must be at least 7 characters"
                  : ""
                : modal.type === "login"
                ? wrongPassword
                  ? "Wrong password"
                  : ""
                : ""}
            </p>
          </div>
          {modal.type === "signup" ? (
            <div className={[classes.field, emptyConfirmPassword || wrongConfirmPassword ? classes.showText : null].join(" ")}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword.length === 0 ? "" : confirmPassword}
                placeholder="Enter your password again"
                onChange={(text) => inputHandler("confirmPassword", text)}
                onFocus={() => inputFocusHandler("confirmPassword")}
              />
              <p className={classes.errorText}>{emptyConfirmPassword ? "Can't be left empty." : "Passwords don't match."}</p>
            </div>
          ) : null}
        </div>
        <div className={classes.bottom}>
          {modal.type === "login" ? (
            <div className={classes.switch}>
              <p>Don't have an account? No problem.</p>
              <p className={classes.signupLink} onClick={switchHandler}>
                Sign up now!
              </p>
            </div>
          ) : (
            <div className={classes.switch}>
              <p>Already have an account?</p>
              <p className={classes.signupLink} onClick={switchHandler}>
                Login now!
              </p>
            </div>
          )}
          <div className={classes.buttons}>
            <div ref={cancelRef} className={classes.cancel}>
              Cancel
            </div>
            <div className={classes.buttonContainer}>
              <div ref={loginRef} className={classes.login} onClick={loginClickHandler}>
                {modal.type === "login" ? "Login" : "Signup"}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Modal;
