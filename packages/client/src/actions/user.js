import axios from 'axios';
import { receivedProfile } from 'Reducer/user';
import { api_endpoint } from './config';

export const ACTION_TYPE = {
  GET_PROFILE: 'user/getProfile',
};

export const getProfile = () => async (dispatch, getState) => {
  const { accessToken } = getState().auth;
  try {
    const res = await axios.get(api_endpoint + `/v1/user/profile`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    dispatch(receivedProfile(res.data));
  } catch (error) {
    dispatch(receivedProfile(error.response?.data));
  }
};

export const updateProfile = user => async (dispatch, getState) => {
  const { accessToken } = getState().auth;
  try {
    const res = await axios.post(api_endpoint + `/v1/user/profile`, user, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    dispatch(receivedProfile(res.data));
  } catch (error) {
    dispatch(receivedProfile(error.response?.data));
  }
};
