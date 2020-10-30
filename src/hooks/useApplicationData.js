import {useState} from "react";
import axios from "axios"

export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayInfo = {...state.days.find(currentDay => currentDay.name === state.day)};

    const filteredDayinfo = dayInfo.appointments.filter(id => appointments[id].interview === null)

    dayInfo.spots = filteredDayinfo.length;
    
    const updatedDays = state.days.map(day => day.id === dayInfo.id ? dayInfo : day)

    state.days = [...updatedDays];

    const days = state.days
    

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({...prev, appointments, days}))
    })
  };

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayInfo = {...state.days.find(currentDay => currentDay.name === state.day)};

    const filteredDayinfo = dayInfo.appointments.filter(id => appointments[id].interview === null)

    dayInfo.spots = filteredDayinfo.length;

    const updatedDays = state.days.map(day => day.id === dayInfo.id ? dayInfo : day)

    state.days = [...updatedDays];

    const days = state.days


    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({...prev, updatedDays, appointments, days}))
    })
  };

  const setDay = day => setState({...state, day})

  return {state, setState, bookInterview, cancelInterview, setDay}


}