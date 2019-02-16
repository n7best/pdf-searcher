import axios from 'axios';
import { receivedPatients } from 'Reducer/patients';

export const ACTION_TYPE = {
  GET_PATIENTS: 'patients/list',
};

export const getPatients = name => async (dispatch, getState) => {
  const { accessToken } = getState().auth;
  try {
    const res = await axios.get(API_BASE_URL + `/v1/patients`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      params: {
        name,
      },
    });

    dispatch(receivedPatients(res.data));
  } catch (error) {
    dispatch(receivedPatients(error.response?.data));
  }
};
