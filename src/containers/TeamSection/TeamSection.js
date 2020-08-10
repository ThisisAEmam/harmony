import React from "react";
import classes from "./TeamSection.module.css";
import TeamMember from "../../components/TeamMember/TeamMember";

const TeamSection = (props) => {
  return (
    <div className={classes.TeamSection}>
      <h1 className={classes.title}>Our team</h1>
      <div className={classes.teamMembers}>
        <TeamMember index={1} name="Mohamed Amr" position="Machine Learning Engineer" />
        <TeamMember index={2} name="Mahmoud Youssef" position="Machine Learning Engineer" upward />
        <TeamMember index={3} name="Mohamed Abdullah" position="Back-end Developer" />
        <TeamMember index={4} name="Ahmed Samir" position="Front-end Developer" upward />
        <TeamMember index={5} name="AbdelRahman Emam" position="Front-end Developer" />
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
