import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectIsFetched,
} from 'redux/contacts/contactsSelectors';

const useContacts = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const isFetched = useSelector(selectIsFetched);

  return {
    contacts,
    isLoading,
    isFetched,
  };
};

export default useContacts;
