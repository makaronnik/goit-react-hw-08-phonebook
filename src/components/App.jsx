import Phonebook from './Phonebook/Phonebook';
import Filter from './ContactList/Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

const App = () => {
  return (
    <Phonebook>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Phonebook>
  );
};

export default App;
