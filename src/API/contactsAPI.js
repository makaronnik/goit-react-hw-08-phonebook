import axiosClient from './axiosClient';

export const fetchAllContacts = async () => {
  const { data } = await axiosClient.get('/contacts');

  return data;
};

export const addNewContact = async contact => {
  const { data } = await axiosClient.post('/contacts', contact);

  return data;
};

export const patchContactById = async ({ id, ...contact }) => {
  const { data } = await axiosClient.patch(`/contacts/${id}`, contact);

  return data;
};

export const deleteContactById = async id => {
  await axiosClient.delete(`/contacts/${id}`);
};
