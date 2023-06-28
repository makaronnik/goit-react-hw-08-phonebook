import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { statuses } from 'utils/constants';
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from './contactsThunks';

const thunks = [fetchContacts, addContact, updateContact, deleteContact];

const createStatus = type => thunks.map(thunk => thunk[type]);

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const initialState = {
  items: [],
  isLoading: false,
  isFetched: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = statuses;
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isFetched = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(({ id }) => id === payload.id);

        state.items[index] = payload;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload);
      })
      .addMatcher(isAnyOf(...createStatus(PENDING)), handlePending)
      .addMatcher(isAnyOf(...createStatus(REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...createStatus(FULFILLED)), handleFulfilled);
  },
});

export const { clearError } = contactsSlice.actions;

export default contactsSlice.reducer;
