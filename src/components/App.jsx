import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { refreshUser } from 'redux/auth/authThunks';
import useAuth from 'hooks/useAuth';
import Layout from './Layout/Layout';
import { Loader } from './Loader/Loader';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));
// import Filter from './ContactList/Filter/Filter';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';

const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <main>
      <p>This section contains information about...</p>
    </main>
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader size={150} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path="/"
          element={
            <PrivateRoute redirectTo="/signin" component={<HomePage />} />
          }
        />

        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/" component={<SignInPage />} />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/" component={<SignUpPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

/* <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList /> */
