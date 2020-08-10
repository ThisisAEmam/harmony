import React, { useState } from "react";
import classes from "./TeamMember.module.css";

const TeamMember = (props) => {
  const [active, setActive] = useState(false);

  let image = props.name.toLowerCase();
  image = image.replace(" ", "_");

  const clickHandler = () => {
    setActive(!active);
  };

  return (
    <div className={[classes.TeamMemberContainer, props.upward ? classes.upward : null].join(" ")}>
      <div className={classes.teamMember}>
        <img src={`images/members/${image}.jpg`} alt="member" />
        <p className={classes.name}>{props.name}</p>
        <p className={classes.position}>{props.position}</p>
        <div className={classes.btnContainer}>
          <div className={classes.btn} onClick={clickHandler}>
            {!active ? "More about me" : <i className="fa fa-chevron-left"></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
