import PropTypes from 'prop-types';
import { ErrorStyled } from './ErrorStyled';

const Error = ({ message }) => {
  return <ErrorStyled>{message}</ErrorStyled>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
