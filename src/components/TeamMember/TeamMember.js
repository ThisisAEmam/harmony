import React, { useEffect, useState } from "react";
import classes from "./TeamMember.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMember } from "../../features/activeMemberSlice";
import { useSpring, animated, config } from "react-spring";

const TeamMember = (props) => {
  const { activeMember } = useSelector((state) => state);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch(setActiveMember);
  const [hide, setHide] = useState(false);

  const fade = useSpring({
    // opacity: hide ? 0 : 1,
    display: hide ? "none" : "inline-block",
    config: config.gentle,
  });

  useEffect(() => {
    if (activeMember.anyCardActive) {
      if (activeMember.index !== props.index) {
        setHide(true);
      }
    } else {
      setHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMember]);

  let image = props.name.toLowerCase();
  image = image.replace(" ", "_");

  const clickHandler = () => {
    if (!active) {
      setActive(true);
      dispatch(setActiveMember({ anyCardActive: true, index: props.index }));
    } else {
      setActive(false);
      dispatch(setActiveMember({ anyCardActive: false, index: null }));
    }
  };

  return (
    <animated.div style={fade} className={[classes.TeamMemberContainer, props.upward ? classes.upward : null].join(" ")}>
      <div className={classes.teamMember}>
        <img src={`images/members/${image}.jpg`} alt="member" />
        <p className={classes.name}>{props.name}</p>
        <p className={classes.position}>{props.position}</p>
        <div className={classes.socialMedia}>
          <p>Follow me on:</p>
          <div className={classes.smlinks}>
            <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href={props.github} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <div className={classes.btn} onClick={clickHandler}>
            {!active ? "Who am I?" : <i className="fa fa-chevron-left"></i>}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default TeamMember;
