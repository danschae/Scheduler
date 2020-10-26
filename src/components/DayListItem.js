import React from "react";

import "components/DayListItem.scss";

const classnames = require("classnames");

export default function DayListItem(props) {

      const buttonClass = classnames({
        "day-list__item": true,
        "day-list__item--selected": props.selected,
        "day-list__item--full": !props.spots
      })

  return (
    <li 
        onClick={() => props.setDay(props.name)}
        className={buttonClass}             
    >
      <h2>{props.name}</h2> 
      <h3>{props.spots}</h3>
    </li>
  );
}