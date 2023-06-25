import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleTheme } from 'redux/theme/themeSlice';

export const ThemeToggler = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};
