import { Navigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import useAuth from 'hooks/useAuth';

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to={redirectTo} />
  ) : (
    <TransitionGroup>{Component}</TransitionGroup>
  );
};
