import { useMappedState } from 'redux-react-hook';

const mapState = state => state.auth;

const useAuth = () => {
  const auth = useMappedState(mapState);

  return auth;
};

export default useAuth;
