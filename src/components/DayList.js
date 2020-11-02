import React from "react";
import DayListItem from "components/DayListItem";
import {SET_DAY} from "hooks/useApplicationData"

export default function DayList(props) {

  
  
  const days = props.days.map((day) => {
    
    return (
      <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={() => props.setDay({type: SET_DAY, day: day.name})}/> 
    )
  })

  return (
    <ul>
      {days}
    </ul>
  )
}