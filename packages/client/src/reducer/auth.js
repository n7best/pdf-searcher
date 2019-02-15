import { ACTION_TYPE } from 'Actions/auth';

export const authenticated = user => ({
  type: ACTION_TYPE.LOG_IN,
  user,
});

const authReducer = (state = { accessToken: null, user: null }, action) => {
  let newState;
  switch (action.type) {
    case ACTION_TYPE.LOG_IN:
      newState = action.user;
      break;
    default:
      return state;
  }
  return newState;
};

export default authReducer;
