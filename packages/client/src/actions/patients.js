import axios from 'axios';
import { receivedPatients } from 'Reducer/patients';
import { api_endpoint } from './config';

export const ACTION_TYPE = {
  GET_PATIENTS: 'patients/list',
};

export const getPatients = name => async (dispatch, getState) => {
  const { accessToken } = getState().auth;
  try {
    const res = await axios.get(api_endpoint + `/v1/patients`, {
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
