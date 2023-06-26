import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
} from 'redux/contacts/contactSelectors';
import { addContact } from 'redux/contacts/contactsThunks';
import ContactFormStyled from './ContactFormStyled';
import FormGroup from 'components/UI/FormGroup/FormGroup';
import Button from 'components/UI/Button/Button';

const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);

        return;
      }

      dispatch(addContact({ name, number }));

      setName('');
      setNumber('');
    },
    [contacts, name, number, dispatch]
  );

  return (
    <ContactFormStyled onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" disabled={isLoading}>
        Add contact
      </Button>
    </ContactFormStyled>
  );
};

export default ContactForm;
