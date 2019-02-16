import { ACTION_TYPE } from 'Actions/user';

export const receivedProfile = user => ({
  type: ACTION_TYPE.GET_PROFILE,
  user,
});

const userProfileReducer = (state = null, action) => {
  let newState;
  if (!action.user) return state;
  switch (action.type) {
    case ACTION_TYPE.GET_PROFILE:
      newState = action.user;
      break;
    default:
      return state;
  }
  return newState;
};

export default userProfileReducer;
