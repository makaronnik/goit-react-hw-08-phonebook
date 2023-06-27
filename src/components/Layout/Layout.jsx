import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTheme } from 'redux/theme/themeSelectors';
// import Filter from './ContactList/Filter/Filter';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
import UserMenu from 'components/UserMenu/UserMenu';

const Layout = () => {
  const theme = useSelector(getTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        sx={{
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md">
          <UserMenu />
          <Suspense fallback={<Loader size={150} />}>
            <Outlet />
          </Suspense>
        </Container>
      </Paper>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
};

export default Layout;
