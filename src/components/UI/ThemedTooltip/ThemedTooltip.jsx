import { styled } from '@mui/material/styles';
import { Fade, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const BaseTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.tooltip.backgroundColor,
    color: theme.palette.tooltip.color,
    fontSize: '0.8em',

    [`& .MuiTooltip-arrow`]: {
      color: theme.palette.tooltip.backgroundColor,
    },
  },
}));

BaseTooltip.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  theme: PropTypes.object,
};

const StyledTooltip = ({ children, ...props }) => {
  return (
    <BaseTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      placement="right"
      arrow
      {...props}
    >
      {children}
    </BaseTooltip>
  );
};

export default StyledTooltip;
