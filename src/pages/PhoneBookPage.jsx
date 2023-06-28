import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Filter from 'components/ContactList/Filter/Filter';
import { Box, Button, Fade, Typography } from '@mui/material';
import ContactList from 'components/ContactList/ContactList';
import ContactFormModal from 'components/ContactFormModal/ContactFormModal';
import { fetchContacts } from 'redux/contacts/contactsThunks';
import useContacts from 'hooks/useContacts';

const PhoneBookPage = ({ in: show }) => {
  const dispatch = useDispatch();

  const [showContactFormModal, setShowContactFormModal] = useState(false);
  const [contactToUpdate, setContactToUpdate] = useState(null);

  const { contacts, isLoading, isFetched } = useContacts();

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isFetched, isLoading]);

  return (
    <>
      {contacts.length === 0 ? (
        <Fade
          in={show}
          timeout={1000}
          appear={true}
          key="contacts-hero"
          unmountOnExit
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 10,
            }}
          >
            <Typography component="p" variant="h4">
              Your contact list is empty
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setShowContactFormModal(true)}
            >
              Add new contact
            </Button>
          </Box>
        </Fade>
      ) : (
        <Fade
          in={show}
          timeout={1000}
          appear={true}
          key="contacts-list"
          unmountOnExit
        >
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Filter />
              <Button
                variant="contained"
                onClick={() => setShowContactFormModal(true)}
                sx={{ pt: '7px', pb: '7px', ml: 2 }}
              >
                Add new contact
              </Button>
            </Box>
            <ContactList />
          </Box>
        </Fade>
      )}
      <ContactFormModal
        open={showContactFormModal}
        onClose={() => setShowContactFormModal(false)}
        contact={contactToUpdate}
      />
    </>
  );
};

PhoneBookPage.propTypes = {
  show: PropTypes.bool,
};

export default PhoneBookPage;
