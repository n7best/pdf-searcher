import React, { useContext } from 'react';
import { StoreContext } from 'redux-react-hook';

const useReduxState = map => {
  const store = useContext(StoreContext);

  return map(store.getState());
};

export default useReduxState;
