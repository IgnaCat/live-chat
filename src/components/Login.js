import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Chip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CTX } from './Store';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState(undefined);
  const [nothing, setNothing] = useState(null);

  const { setUser } = useContext(CTX);
  const history = useHistory();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setNothing(null);
    if (!nothing) {
      setNothing('Please write an username');
    } else {
      setUser(username);
      localStorage.setItem('chat-user', username);
      history.push('/home');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        variant="h4"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Chat App
      </Typography>
      <div className={classes.paper} style={{ marginTop: '3rem' }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in as
        </Typography>
        <form onSubmit={loginHandler} className={classes.form} noValidate>
          <TextField
            onChange={usernameHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="username"
            autoFocus
            onKeyPress={(e) => {
              var key = window.event.keyCode;
              if (key === 13) {
                if (!nothing) {
                  setNothing('Please write an username');
                } else {
                  setUser(username);
                  localStorage.setItem('chat-user', username);
                  history.push('/home');
                }
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {!!nothing && (
          <Chip
            label={nothing}
            color="secondary"
            onDelete={() => setNothing(null)}
          />
        )}
      </div>
    </Container>
  );
};

export default Login;
