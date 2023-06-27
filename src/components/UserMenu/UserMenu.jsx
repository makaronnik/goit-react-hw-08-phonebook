import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import { ThemeToggler } from 'components/UI/ThemeToggler/ThemeToggler';
import { logout } from 'redux/auth/authThunks';
import useAuth from 'hooks/useAuth';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

          py: 2,
        }}
      >
        <ThemeToggler />
        <Typography
          sx={{
            ml: 'auto',
            mr: 2,
          }}
        >
          {user?.email}
        </Typography>
        {isLoggedIn && (
          <Button variant="outlined" onClick={() => dispatch(logout())}>
            Log out
          </Button>
        )}
        {location.pathname === '/signup' && (
          <Link to={'/signin'}>
            <Button variant="outlined">Sign in</Button>
          </Link>
        )}
        {location.pathname === '/signin' && (
          <Link to={'/signup'}>
            <Button variant="outlined">Sign up</Button>
          </Link>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
    </>
  );
};

export default UserMenu;
