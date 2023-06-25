import { Box, Typography, Button } from '@mui/material';
import { ThemeToggler } from 'components/UI/ThemeToggler/ThemeToggler';

const UserMenu = () => {
  return (
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
      <Button variant="outlined">Log In</Button>
    </Box>
  );
};

export default UserMenu;
