import { ThreeDots } from 'react-loader-spinner';
import LoaderStyled from './LoaderStyled';

const Loader = () => {
  return (
    <LoaderStyled>
      <ThreeDots
        height="60"
        width="60"
        radius="9"
        color="#292929"
        ariaLabel="three-dots-loading"
      />
    </LoaderStyled>
  );
};

export default Loader;
