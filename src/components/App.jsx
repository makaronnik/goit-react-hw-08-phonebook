import CssBaseline from '@mui/material/CssBaseline';
import { Paper, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTheme } from 'redux/theme/themeSelectors';
// import Filter from './ContactList/Filter/Filter';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
import UserMenu from './UserMenu/UserMenu';

const SignUpPage = lazy(() => import('pages/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));

const App = () => {
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
            <SignUpPage />
            <SignInPage />
          </Suspense>
          {/* <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList /> */}
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

export default App;
