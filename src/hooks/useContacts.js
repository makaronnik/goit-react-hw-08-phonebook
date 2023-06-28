import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectIsFetched,
  selectError,
} from 'redux/contacts/contactsSelectors';

const useContacts = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const isFetched = useSelector(selectIsFetched);
  const error = useSelector(selectError);

  return {
    contacts,
    isLoading,
    isFetched,
    error,
  };
};

export default useContacts;
