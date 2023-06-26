import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/filter/filterSelectors';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/contactSelectors';
import { fetchContacts, deleteContact } from 'redux/contacts/contactsThunks';
import ContactListStyled from './ContactListStyled';
import Button from 'components/UI/Button/Button';
import Error from 'components/Error/Error';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
    <>
      {/* {isLoading && <Loader />} */}
      {error && <Error message={error.message} />}
      <ContactListStyled>
        {filteredContacts &&
          filteredContacts.map(({ id, name, number }) => (
            <li key={id}>
              <div>
                {name}: {number}{' '}
                <Button
                  small
                  type="submit"
                  disabled={isLoading}
                  onClick={() => dispatch(deleteContact(id))}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ContactListStyled>
    </>
  );
};

export default ContactList;
