import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import useAuth from 'hooks/useAuth';

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to={redirectTo} />
  ) : (
    <TransitionGroup>{Component}</TransitionGroup>
  );
};

RestrictedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default RestrictedRoute;
