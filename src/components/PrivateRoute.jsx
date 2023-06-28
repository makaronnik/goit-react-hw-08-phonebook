import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import useAuth from 'hooks/useAuth';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? (
    <Navigate to={redirectTo} />
  ) : (
    <TransitionGroup>{Component}</TransitionGroup>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
