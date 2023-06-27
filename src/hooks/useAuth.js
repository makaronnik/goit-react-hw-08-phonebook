import { useSelector } from 'react-redux';
import { selectUser, selectIsRefreshing } from 'redux/auth/authSelectors';

const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = user !== null;
  const isRefreshing = useSelector(selectIsRefreshing);

  return {
    user,
    isLoggedIn,
    isRefreshing,
  };
};

export default useAuth;
