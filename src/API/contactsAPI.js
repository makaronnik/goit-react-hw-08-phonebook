import axios from 'axios';

axios.defaults.baseURL = 'https://648dc63f2de8d0ea11e834c5.mockapi.io';

export const fetchAllContacts = async () => {
  const { data } = await axios.get('/contacts');

  return data;
};

export const addNewContact = async contact => {
  const { data } = await axios.post('/contacts', contact);

  return data;
};

export const deleteContactById = async id => {
  await axios.delete(`/contacts/${id}`);
};
