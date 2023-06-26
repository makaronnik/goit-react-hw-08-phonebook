import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { setAuthToken, removeAuthToken } from 'API/axiosClient';
import { statuses } from 'utils/constants';
import { register, login, logout } from './authThunks';

const thunks = [register, login, logout];

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
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = statuses;

    builder
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.user = null;

        removeAuthToken();
      })

      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, { payload }) => {
          state.token = payload.token;
          state.user = { ...payload.user };

          setAuthToken(payload.token);
        }
      )

      .addMatcher(isAnyOf(...createStatus(PENDING)), handlePending)
      .addMatcher(isAnyOf(...createStatus(REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...createStatus(FULFILLED)), handleFulfilled)

      .addDefaultCase(state => state);
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
