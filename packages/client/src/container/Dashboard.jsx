import React from 'react';
import { css } from "emotion";
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';

const Dashboard = ({user}) => {
  return (
    <div className={styles.container}>
      <p>Hello {user.name}!</p>
      {
        user.role === 'patient' &&
        <PatientDashboard user={user} />
      }
      {
        user.role === 'doctor' &&
        <DoctorDashboard user={user} />
      }
    </div>
  )
}

const styles = {
  container: css`
    padding: 10px 20px;
  `
}

export default Dashboard;