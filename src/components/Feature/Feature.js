import React, { useState, useEffect } from "react";
import classes from "./Feature.module.css";
import ReactCompareImage from "react-compare-image";
import data from "./data";
import { useSpring, animated, config } from "react-spring";

const Feature = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [heightFromTop, SetHeightFromTop] = useState(0);
  const [show, setShow] = useState(false);

  const featureRef = React.createRef();

  useEffect(() => {
    props.dimensions(featureRef.current.clientWidth, featureRef.current.clientHeight);
    switch (props.index) {
      case 1:
        setTitle(data.first.title);
        setText(data.first.text);
        break;
      case 2:
        setTitle(data.second.title);
        setText(data.second.text);
        break;
      case 3:
        setTitle(data.third.title);
        setText(data.third.text);
        break;

      default:
        break;
    }
    let rect = featureRef.current.getBoundingClientRect();
    SetHeightFromTop(rect.y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (heightFromTop !== 0) {
      window.addEventListener("scroll", showHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightFromTop]);

  const showHandler = () => {
    if (window.scrollY > heightFromTop - window.innerHeight / 2) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const toRight = useSpring({
    from: {
      opacity: 0,
      transform: "translateX(-5rem)",
    },
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(-5rem)",
    config: config.slow,
  });

  const toLeft = useSpring({
    from: {
      opacity: 0,
      transform: "translateX(5rem)",
    },
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(5rem)",
    config: config.slow,
  });

  return (
    <div className={[classes.Feature, props.inverted ? classes.inverted : null].join(" ")}>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.imageContainer} ref={featureRef}>
            <ReactCompareImage leftImage={props.firstImage} rightImage={props.secondImage} />
          </div>
        </div>
        <animated.div style={props.inverted ? toLeft : toRight} className={classes.textContainer}>
          <p className={classes.number}>{props.index}</p>
          <p className={classes.title}>{title}</p>
          <p className={classes.text}>{text}</p>
        </animated.div>
      </div>
    </div>
  );
};

export default Feature;
