
// filtering days so the correct appointment shows up per day
export function getAppointmentsForDay(state, day) {

  const dayFound = state.days.find(currentDay => currentDay.name === day);

  if(!dayFound) {
    return []
  };

  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);

  return appointments
};

export function getInterview(state, interview) {
  let returnedObject = {};
  if (interview !== null) {
    returnedObject = {
      "student": interview.student,
      "interviewer":
      {"id": interview.interviewer,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  }
    return returnedObject;
  }
  return null
};

export function getInterviewersForDay(state, day) {
  
  const dayFound = state.days.find(currentDay => currentDay.name === day);

  if(!dayFound) {
    return []
  };

  const interviewers = dayFound.interviewers.map(appointmentId => state.interviewers[appointmentId]);

  return interviewers;
};




