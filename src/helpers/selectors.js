
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




