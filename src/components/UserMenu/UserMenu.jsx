import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Divider } from '@mui/material';
import { ThemeToggler } from 'components/UI/ThemeToggler/ThemeToggler';
import { logout } from 'redux/auth/authThunks';

const UserMenu = () => {
  const dispatch = useDispatch();

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
          mango@mail.com
        </Typography>
        <Button variant="outlined">Log in</Button>
        <Button variant="outlined">Sign up</Button>
        <Button variant="outlined" onClick={() => dispatch(logout())}>
          Log out
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
    </>
  );
};

export default UserMenu;
