import React, { useState, useEffect } from "react";

import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"


const appointments = [
  {
    id: 1,
    time: "12:00",
  },
  {
    id: 2,
    time: "13:00",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "14:00",
    interview: {
      student: "Albert Einstein",
      interviewer: {
        id: 2,
        name: "Celine Dion",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },

  {
    id: 4,
    time: "15:00"
  },

  {
    id: 5,
    time: "16:00",
    interview: {
      student: "Donald Trump",
      interviewer: {
        id: 3,
        name: "Bill Barr",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" 
      }
    }
  }
];


export default function Application(props) {


  const appointment= appointments.map(appointment => {
    return (
    <Appointment 
      key={appointment.id}
      {...appointment}
    />
    )
  });

  const [days, setDay] = useState([]);
  const [day, setCurrentDay] = useState("Monday");

  useEffect(() => {
    axios.get("/api/days")
    .then(response => {
      setDay(response.data)
    })
  },[])
  
  return (
    <main className="layout">
      <section className="sidebar">
         <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={days}
              day={day}
              setDay={setCurrentDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointment }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
