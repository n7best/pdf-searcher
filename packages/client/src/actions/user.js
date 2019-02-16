import axios from 'axios';
import { receivedProfile } from 'Reducer/user';

export const ACTION_TYPE = {
  GET_PROFILE: 'user/getProfile',
};

export const getProfile = () => async (dispatch, getState) => {
  const { accessToken } = getState().auth;
  try {
    const res = await axios.get(API_BASE_URL + `/v1/user/profile`, {
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
    const res = await axios.post(API_BASE_URL + `/v1/user/profile`, user, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    dispatch(receivedProfile(res.data));
  } catch (error) {
    dispatch(receivedProfile(error.response?.data));
  }
};
