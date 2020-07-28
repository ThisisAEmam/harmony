import React, { useEffect, useState } from "react";
import classes from "./Features.module.css";
import Feature from "../../components/Feature/Feature";
import { useSelector } from "react-redux";

const Features = (props) => {
  const canvasRef = React.createRef();
  const featuresRef = React.createRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [featureDimensions, setFeatureDimensions] = useState({ width: 0, height: 0 });

  const { screen } = useSelector((state) => state);

  useEffect(() => {
    setWidth(featuresRef.current.offsetWidth * 0.8);
    setHeight(featuresRef.current.offsetHeight);
  }, [featuresRef]);

  useEffect(() => {
    if (width !== 0 && height !== 0) {
      const canvas = canvasRef.current;
      let margin;
      if (screen === "Full HD") {
        margin = 5 * 16;
      } else if (screen === "HD") {
        margin = 5 * 12;
      } else if (screen === "Mobile") {
        margin = 5 * 10;
      }
      canvas.width = width;
      canvas.height = featureDimensions.height * 3 + featureDimensions.height / 1.3;
      const ctx = canvas.getContext("2d");
      drawDashedLine(ctx, width / 2, 0, width / 2, featureDimensions.height / 2 - margin, [5, 5]);
      drawDashedLine(ctx, width / 2, featureDimensions.height / 2 - margin, width / 2 - featureDimensions.width, featureDimensions.height / 2 - margin, [5, 5]);
      drawDashedLine(ctx, featureDimensions.width, featureDimensions.height, featureDimensions.width, featureDimensions.height * 1.5, [5, 5]);
      drawDashedLine(ctx, featureDimensions.width, featureDimensions.height * 1.5, width / 2 + featureDimensions.width, featureDimensions.height * 1.5, [5, 5]);
      drawDashedLine(
        ctx,
        width - featureDimensions.width,
        featureDimensions.height * 2 + margin,
        width - featureDimensions.width,
        featureDimensions.height * 2.5 + margin,
        [5, 5]
      );
      drawDashedLine(ctx, width - featureDimensions.width, featureDimensions.height * 2.5 + 80, featureDimensions.width, featureDimensions.height * 2.5 + 80, [
        5,
        5,
      ]);
    }
  }, [width, height, canvasRef, featureDimensions, screen]);

  const drawDashedLine = (ctx, fromX, fromY, toX, toY, pattern) => {
    ctx.beginPath();
    ctx.strokeStyle = "#eb5f4b";
    ctx.lineWidth = 2;
    ctx.setLineDash(pattern);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  };

  const featureDiemnsionHandler = (width, height) => {
    setFeatureDimensions({ width: width, height: height });
  };

  return (
    <div className={classes.Features} ref={featuresRef}>
      <div className={classes.container}>
        <div className={classes.bannerCircles}>
          <div className={classes.bannerCircle1} />
          <div className={classes.bannerCircle2} />
          <div className={classes.bannerCircle3} />
          <div className={classes.bannerCircle4} />
          <div className={classes.bannerCircle5} />
          <div className={classes.bannerCircle6} />
          <div className={classes.bannerCircle7} />
          <div className={classes.bannerCircle8} />
        </div>
        <h1 className={classes.title}>What is in our bag?</h1>
        <canvas ref={canvasRef}></canvas>
        <Feature index={1} firstImage="/images/greyFirst.jpg" secondImage="/images/greyRes.jpg" dimensions={featureDiemnsionHandler} />
        <Feature index={2} firstImage="/images/personFirst.jpg" secondImage="/images/personRes.jpg" inverted dimensions={featureDiemnsionHandler} />
        <Feature index={3} firstImage="/images/deepHarmonFirst.jpg" secondImage="/images/deepHarmonRes.jpg" dimensions={featureDiemnsionHandler} />
      </div>
    </div>
  );
};

export default Features;
