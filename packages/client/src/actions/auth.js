import axios from 'axios';
import { authenticated } from 'Reducer/auth';

export const ACTION_TYPE = {
  LOG_IN: 'auth/login',
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post(API_BASE_URL + `/v1/auth/login`, {
      email,
      password,
    });
    dispatch(authenticated(res.data));
  } catch (error) {
    dispatch(authenticated(error.response?.data));
  }
};
