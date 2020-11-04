import React, {useEffect } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
import useApplicationData,{SET_APPLICATION_DATA} from "hooks/useApplicationData"





export default function Application(props) {

  const {state, dispatch, bookInterview, cancelInterview} = useApplicationData();

  // store the appointments per day in a variable to be mapped
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointments.map((appointment) => {

  const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })
  
  // api requests for getting data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all)
      dispatch({type: SET_APPLICATION_DATA, days:all[0].data, appointments:all[1].data, interviewers:all[2].data})
    })
  },[dispatch])
  
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
              days={state.days}
              day={state.day}
              setDay={dispatch}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
