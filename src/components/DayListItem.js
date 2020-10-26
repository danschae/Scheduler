import React from "react";

import "components/DayListItem.scss";

const classnames = require("classnames");

export default function DayListItem(props) {

      const formatSpots = (spots) => {
        if (spots < 1) {
          return "no spots remaining"
        } else if (spots === 1) {
          return `${spots} spot remaining`
        }
        return `${spots} spots remaining`
      }

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
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}