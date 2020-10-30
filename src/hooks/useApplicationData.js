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
    setState({...state, appointments})
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({...prev, appointments}))
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

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({...prev, appointments}))
    })

  }

  return {state, setState, bookInterview, cancelInterview}


}