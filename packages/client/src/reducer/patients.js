import { ACTION_TYPE } from 'Actions/patients';

export const receivedPatients = patients => ({
  type: ACTION_TYPE.GET_PATIENTS,
  patients,
});

const patientsReducer = (state = null, action) => {
  let newState;
  switch (action.type) {
    case ACTION_TYPE.GET_PATIENTS:
      newState = action.patients;
      break;
    default:
      return state;
  }
  return newState;
};

export default patientsReducer;
