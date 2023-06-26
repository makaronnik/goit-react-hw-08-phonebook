import axiosClient from './axiosClient';

export const signUp = async credentials => {
  const { data } = await axiosClient.post('/users/signup', credentials);

  return data;
};

export const signIn = async credentials => {
  const { data } = await axiosClient.post('/users/login', credentials);

  return data;
};

export const signOut = async () => {
  await axiosClient.post('/users/logout');
};
