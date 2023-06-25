import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllContacts,
  addNewContact,
  deleteContactById,
} from 'API/contactsAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await fetchAllContacts();

      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const newContact = await addNewContact(contact);

      return newContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContactById(id);

      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
