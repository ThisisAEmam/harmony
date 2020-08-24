import React from "react";
import classes from "./VideoSection.module.css";

const VideoSection = (props) => {
  return (
    <div className={classes.VideoSection}>
      <h1 className={classes.title}>New to magicians world?</h1>
      <p className={classes.subtitle}> Learn how to use our tricks now!</p>
      <div className={classes.videoContainer}>
        <iframe
          className={classes.video}
          title="vimeo-player"
          src="https://www.youtube.com/embed/_gwOD0Wueek"
          frameBorder="0"
          allow="fullscreen"
          allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
