import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import { addContact, updateContact } from 'redux/contacts/contactsThunks';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { validateName, validatePhone } from 'utils/validators';

const ContactFormModal = ({ open, onClose, contact = null }) => {
  const isUpdate = contact !== null;
  const title = isUpdate ? 'Updating a contact' : 'Adding a contact';
  const submitButtonText = isUpdate ? 'Update' : 'Add';

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(null);
  const [numberError, setNumberError] = useState(null);

  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  useEffect(() => {
    if (contact !== null) {
      setName(contact.name);
      setNumber(contact.number);
    } else {
      setName('');
      setNumber('');
    }
  }, [contact]);

  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    setNameError(null);
    setNumberError(null);

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

  const handleSubmit = event => {
    event.preventDefault();

    let errors = false;

    if (!name) {
      setNameError('Name is required');
      errors = true;
    } else if (!validateName(name)) {
      setNameError(
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      );
      errors = true;
    }

    if (!number) {
      setNumberError('Phone number is required');
      errors = true;
    } else if (!validatePhone(number)) {
      setNumberError(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      errors = true;
    }

    if (errors) {
      return;
    }

    if (
      !isUpdate &&
      contacts.some(({ name: contactName }) => contactName === name)
    ) {
      setNameError(`${name} is already in contacts.`);

      return;
    }

    if (isUpdate) {
      dispatch(updateContact({ ...contact, name, number }));
    } else {
      dispatch(addContact({ name, number }));
    }

    setName('');
    setNumber('');

    onClose();
  };

  const handleOnClose = () => {
    setName('');
    setNumber('');

    setNameError(null);
    setNumberError(null);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { position: 'fixed', top: 50 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                id="name"
                required
                fullWidth
                value={name}
                onChange={handleChange}
                error={nameError !== null}
                helperText={nameError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Number"
                name="number"
                id="number"
                type="tel"
                required
                fullWidth
                value={number}
                onChange={handleChange}
                error={numberError !== null}
                helperText={numberError}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {submitButtonText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

ContactFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default ContactFormModal;
