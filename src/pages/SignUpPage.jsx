import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Avatar,
  Button,
  TextField,
  Link as MuiLink,
  Grid,
  Typography,
  Fade,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';
import { validateEmail } from 'utils/validators';
import { register } from 'redux/auth/authThunks';
import { clearError } from 'redux/auth/authSlice';
import { selectIsLoading, selectError } from 'redux/auth/authSelectors';
import { Loader } from 'components/Loader/Loader';

const SignUpPage = ({ in: show }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
  }, [email, name, password]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => dispatch(clearError()),
      });
    }
  }, [dispatch, error]);

  const handleSubmit = event => {
    event.preventDefault();

    let errors = false;

    if (name.length < 3) {
      setNameError('Name must be at least 3 characters');
      errors = true;
    }

    if (!validateEmail(email)) {
      setEmailError('Email is not valid');
      errors = true;
    }

    if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters');
      errors = true;
    }

    if (errors) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const credentials = Object.fromEntries(formData.entries());

    dispatch(register(credentials));
  };

  if (isLoading) {
    return <Loader size={150} />;
  }

  return (
    <Fade in={show} timeout={1000} appear={true} key="signup" unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                id="name"
                autoComplete="name"
                required
                fullWidth
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                error={nameError !== null}
                helperText={nameError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                id="email"
                autoComplete="email"
                required
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={emailError !== null}
                helperText={emailError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                id="password"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={passwordError !== null}
                helperText={passwordError}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={'/signin'}>
                <MuiLink variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
};

SignUpPage.propTypes = {
  show: PropTypes.bool,
};

export default SignUpPage;
