import PropTypes from 'prop-types';
import Filter from 'components/ContactList/Filter/Filter';
import { Box, Fade } from '@mui/material';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';

const PhoneBookPage = ({ in: show }) => (
  <Fade in={show} timeout={1000} appear={true} key="signup" unmountOnExit>
    <Box>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Box>
  </Fade>
);

PhoneBookPage.propTypes = {
  in: PropTypes.bool.isRequired,
};

export default PhoneBookPage;
