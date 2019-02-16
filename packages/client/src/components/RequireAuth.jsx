import React from 'react';
import useAuth from 'Hooks/useAuth';
import { Redirect } from 'react-router-dom'

const RequireAuth = Component => (props) => {
  const { user } = useAuth();
  if(!user) return <Redirect to='/' />
  return <Component {...props} user={user}/>
}

export default RequireAuth;