import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/filter/filterSelectors';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { fetchContacts, deleteContact } from 'redux/contacts/contactsThunks';
import { Box, Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ContactListItem from './ContactListItem/ContactListItem';

const ContactList = ({ onUpdate }) => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    if (!filter || !contacts.length) {
      return contacts;
    }

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <Box sx={{ display: 'inline-block' }}>
      <List>
        <TransitionGroup>
          {filteredContacts.map((contact, index) => (
            <Collapse key={contact.id}>
              <ContactListItem
                contact={contact}
                onUpdate={onUpdate}
                onRemove={({ id }) => dispatch(deleteContact(id))}
                isLast={index === filteredContacts.length - 1}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

ContactList.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default ContactList;
