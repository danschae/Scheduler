import React, {} from "react";
import "./InterviewerListItem.scss";
const classnames = require("classnames");


export default function InterviewerListItem(props) {

    const interviewClass = classnames({
      "interviewers__item": true,
      "interviewers__item--selected": props.selected,
    })
  

  return (
    <li className={interviewClass}
      onClick={props.setInterviewer}
    >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )
}