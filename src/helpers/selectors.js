
// filtering days so the correct appointment shows up per day
export function getAppointmentsForDay(state, day) {
  let returnedAppointments = [];
  for (const currentDay of state.days) {
     if (currentDay.name === day && currentDay.appointments.length > 0) {
          currentDay.appointments.forEach(id => {returnedAppointments.push(state.appointments[id])})
            return returnedAppointments;
        } 
      }
   return returnedAppointments;
};

export  function getInterview(state, interview) {
  let returnedObject = {};
  if (interview !== null) {
    returnedObject = interview;
    let selectInterview = interview.interviewer
    returnedObject.interviewer = state.interviewers[selectInterview]
    return returnedObject
  }
  return null
};

export function getInterviewersForDay(state, day) {
  let returnedInterviewers = [];
  for (const currentDay of state.days) {
     if (currentDay.name === day && currentDay.interviewers.length > 0) {
          currentDay.interviewers.forEach(id => {returnedInterviewers.push(state.interviewers[id])})
            return returnedInterviewers;
        } 
      }
   return returnedInterviewers;
};




