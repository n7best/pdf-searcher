import React, { useEffect, useCallback } from 'react';
import { css } from "emotion";
import ObjectForm from 'Components/ObjectForm';
import {useDispatch} from 'redux-react-hook';
import { getProfile, updateProfile } from 'Actions/user';
import { useMappedState } from 'redux-react-hook';

const mapState = state => state.user;

const PatientDashboard = (props) => {
  const user = useMappedState(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile())
  }, [props])

  const updateHandler = useCallback((user) => {
    dispatch(updateProfile(user))
  })

  return (
    <div className={styles.container}>
    {
      user && 
      <ObjectForm 
        object={user}
        hide={['_id', 'role']}
        onSubmit={updateHandler}
      />
    }
    </div>
  )
}

const styles = {
  container: css`
    padding: 10px 20px;
  `
}

export default PatientDashboard;