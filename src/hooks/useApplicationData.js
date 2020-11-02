import {useReducer} from "react";
import axios from "axios"

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day}
    case SET_APPLICATION_DATA:
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
    case SET_INTERVIEW: {
      return {...state, appointments: action.appointments, days: action.days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    }
    export default function useApplicationData() {
      
      const [state, dispatch] = useReducer(reducer,{
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });


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
      dispatch({type: SET_INTERVIEW, appointments, days})
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
      dispatch({type: SET_INTERVIEW, appointments, days})
    })
  };
  

  // const setDay = day => dispatch({type: SET_DAY, day,})


  return {state, dispatch, bookInterview, cancelInterview}


}