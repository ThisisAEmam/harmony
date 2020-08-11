import React, { useEffect, useState } from "react";
import classes from "./TeamSection.module.css";
import TeamMember from "../../components/TeamMember/TeamMember";
import { useSelector } from "react-redux";
import { useSpring, animated, config } from "react-spring";
import textData from "./data";

const TeamSection = (props) => {
  const { activeMember } = useSelector((state) => state);
  const [showText, setShowText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (activeMember.anyCardActive) {
      setTimeout(() => {
        setShowText(true);
      }, 500);
      setTextIndex(activeMember.index);
    } else {
      setShowText(false);
      setTextIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMember]);

  let textBody = "";
  let textName = "";

  switch (textIndex) {
    case 1:
      textName = textData.first.name;
      textBody = textData.first.text;
      break;
    case 2:
      textName = textData.second.name;
      textBody = textData.second.text;
      break;
    case 3:
      textName = textData.third.name;
      textBody = textData.third.text;
      break;
    case 4:
      textName = textData.fourth.name;
      textBody = textData.fourth.text;
      break;
    case 5:
      textName = textData.fifth.name;
      textBody = textData.fifth.text;
      break;

    default:
      textName = "";
      textBody = "";
      break;
  }

  const textSpring = useSpring({
    opacity: showText ? 1 : 0,
    transform: showText ? "translateX(0)" : "translateX(-2rem)",
    config: config.default,
  });

  return (
    <div className={classes.TeamSection}>
      <h1 className={classes.title}>Our team</h1>
      <div className={classes.teamMembers}>
        {/* <animated.div className={classes.teamMember}>
          <TeamMember index={1} name="Mohamed Amr" position="Machine Learning Engineer" />
        </animated.div>
        <animated.div className={classes.teamMember}>
          <TeamMember index={2} name="Mahmoud Youssef" position="Machine Learning Engineer" upward />
        </animated.div>
        <animated.div className={classes.teamMember}>
          <TeamMember index={3} name="Mohamed Abdullah" position="Back-end Developer" />
        </animated.div>
        <animated.div className={classes.teamMember}>
          <TeamMember index={4} name="Ahmed Samir" position="Front-end Developer" upward />
        </animated.div>
        <animated.div className={classes.teamMember}>
          <TeamMember index={5} name="AbdelRahman Emam" position="Front-end Developer" />
        </animated.div> */}
        <TeamMember index={1} name="Mohamed Amr" position="Machine Learning Engineer" />
        <TeamMember index={2} name="Mahmoud Youssef" position="Machine Learning Engineer" upward />
        <TeamMember index={3} name="Mohamed Abdullah" position="Back-end Developer" />
        <TeamMember index={4} name="Ahmed Samir" position="Front-end Developer" upward />
        <TeamMember index={5} name="AbdelRahman Emam" position="Front-end Developer" />
        <animated.div style={textSpring} className={classes.text}>
          <p className={classes.name}>{textName} says</p>
          <p className={classes.body}>"{textBody}"</p>
        </animated.div>
      </div>
      <div className={classes.bannerCircles}>
        <div className={classes.bannerCircle1} />
        <div className={classes.bannerCircle2} />
        <div className={classes.bannerCircle3} />
        <div className={classes.bannerCircle4} />
        <div className={classes.bannerCircle5} />
      </div>
    </div>
  );
};

export default TeamSection;
