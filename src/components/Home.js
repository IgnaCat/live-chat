import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
    alignContent: 'center',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  flex1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },
  topics: {
    width: '20%',
    height: '450px',
  },
  users: {
    width: '20%',
    height: '450px',
  },
  chat: {
    margin: '1rem',
    width: '60%',
    height: '450px',
    padding: '30px',
  },
  chatBox: { width: '85%' },
  button: { width: '15%' },
}));

const Home = () => {
  const classes = useStyles();
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [msg, setMsg] = useState('');
  const [nothing, setNothing] = useState(null);

  return (
    <div className={classes.root}>
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
      <Typography
        variant="h5"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <Paper className={classes.topics}>
          <Typography variant="h6" style={{ margin: '1rem' }}>
            Channels:
          </Typography>
          <List>
            {topics.map((topic) => (
              <ListItem
                key={topic}
                button
                onClick={(e) => setActiveTopic(e.target.innerText)}
              >
                <ListItemText
                  primary={topic}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper className={classes.chat}>
          {allChats[activeTopic].map((chat, i) => (
            <div
              className={classes.flex}
              style={{ marginBottom: '4px' }}
              key={i}
            >
              <Chip label={chat.from} />
              <Typography variant="body1" style={{ marginLeft: '4px' }}>
                {chat.msg}
              </Typography>
            </div>
          ))}
        </Paper>
        <Paper className={classes.users}>
          <Typography variant="h6" style={{ margin: '1rem' }}>
            Online:
          </Typography>
          <List>
            {['Admin', 'Pepe'].map((topic) => (
              <ListItem key={topic} button>
                <ListItemText
                  primary={topic}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>

      <div className={classes.flex1}>
        <TextField
          className={classes.chatBox}
          label="Send a chat"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
          onKeyPress={(e) => {
            var key = window.event.keyCode;
            if (key === 13) {
              if (msg === '') {
                setNothing('Please write something');
              } else {
                sendChatAction({ from: user, msg: msg, topic: activeTopic });
                setMsg('');
                setNothing(null);
              }
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (msg === '') {
              setNothing('Please write something');
            } else {
              sendChatAction({ from: user, msg: msg, topic: activeTopic });
              setMsg('');
              setNothing(null);
            }
          }}
        >
          Send
        </Button>
      </div>
      <div className={classes.flex1}>
        {!!nothing && (
          <Chip
            label={nothing}
            color="secondary"
            onDelete={() => setNothing(null)}
          />
        )}
      </div>

      <br></br>
    </div>
  );
};

export default Home;
