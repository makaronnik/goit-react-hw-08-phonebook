import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signOut, signUp } from 'API/authApi';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await signUp(credentials);

      return user;
    } catch (error) {
      if (!error.code || error.code !== 'ERR_BAD_REQUEST') {
        return rejectWithValue('Something went wrong! Try again later.');
      }

      return rejectWithValue('Your email is already in use!');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await signIn(credentials);

      return user;
    } catch (error) {
      if (!error.code || error.code !== 'ERR_BAD_REQUEST') {
        return rejectWithValue('Something went wrong! Try again later.');
      }

      return rejectWithValue('Your credentials are invalid!');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
    } catch (error) {
      return rejectWithValue('Something went wrong! Try again later.');
    }
  }
);
