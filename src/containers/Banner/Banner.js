import React, { useRef } from "react";
import classes from "./Banner.module.css";
import { Link } from "react-router-dom";
import { useSpring, useChain, animated, config } from "react-spring";

const Banner = (props) => {
  const darkBGRef = useRef();
  const darkBG = useSpring({
    ref: darkBGRef,
    from: {
      transform: "translateX(100%)",
    },

    transform: "translateX(0)",
    config: config.slow,
  });

  const fadeInRef = useRef();
  const fadeIn = useSpring({
    ref: fadeInRef,
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    opacity: 1,
    transform: "scale(1)",
    // config: { mass: 5, tension: 200, friction: 50 },
    config: config.gentle,
  });

  const circlesFadeInRef = useRef();
  const circlesFadeIn = useSpring({
    ref: circlesFadeInRef,
    from: {
      opacity: 0,
    },
    opacity: 1,
    config: config.gentle,
  });

  const bannerRef = React.createRef();

  useChain([darkBGRef, fadeInRef, circlesFadeInRef]);

  return (
    <div className={classes.Banner} ref={bannerRef}>
      <animated.div style={circlesFadeIn} className={classes.bannerCircles}>
        <div className={classes.bannerCircle1} />
        <div className={classes.bannerCircle2} />
        <div className={classes.bannerCircle3} />
        <div className={classes.bannerCircle4} />
        <div className={classes.bannerCircle5} />
      </animated.div>
      <div className={classes.leftSide}>
        <div className={classes.leftSideContainer}>
          <p>
            Because your images need some <span>magic.</span>
          </p>
          <div className={classes.buttonContainer}>
            <Link to="/" className={classes.editorBtn}>
              Join us now!
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.rightSide}>
        <animated.div style={fadeIn} className={classes.imageContainer}>
          <div className={classes.image}>
            <img src="/images/bannerImage.jpg" alt="banner" />
          </div>
        </animated.div>
        <animated.div style={darkBG} className={classes.darkBG} />
      </div>
    </div>
  );
};

export default Banner;
