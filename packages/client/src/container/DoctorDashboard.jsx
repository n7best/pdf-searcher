import React, { useEffect, useState, useCallback } from 'react';
import { css } from "emotion";
import { getPatients } from 'Actions/patients';
import {useDispatch} from 'redux-react-hook';
import { useMappedState } from 'redux-react-hook';
import Input from 'Components/Input';
import useDebounce from 'Hooks/useDebounce';

const mapState = state => state.patients;

const DoctorDashboard = (props) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const patients = useMappedState(mapState);
  const dispatch = useDispatch();
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    dispatch(getPatients(debounceSearchTerm))
  }, [debounceSearchTerm])

  return (
    <div className={styles.container}>
      <Input 
        value={searchTerm} 
        onChange={setSearchTerm}
        placeholder="Search Patient"
      />
      {
        patients && patients.map(({_id, name}) => <p key={_id}>{name}</p>)
      }
    </div>
  )
}

const styles = {
  container: css`
    padding: 10px 20px;
  `
}

export default DoctorDashboard;