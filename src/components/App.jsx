import CssBaseline from '@mui/material/CssBaseline';
import { Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { getTheme } from 'redux/theme/themeSelectors';
import Filter from './ContactList/Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Container } from '@mui/material';
import UserMenu from './UserMenu/UserMenu';

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
        <Container maxWidth="sm">
          <UserMenu />
          {/* <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList /> */}
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
