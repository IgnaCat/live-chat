import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
  general: [],
  channel2: [],
};

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECIEVED_MESSAGE':
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      };
    default:
      return state;
  }
};

let socket;

const sendChatAction = (value) => {
  socket.emit('chat message', value);
};

const Store = (props) => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  const [user, setUser] = React.useState();

  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function (msg) {
      dispatch({ type: 'RECIEVED_MESSAGE', payload: msg });
    });
  }

  if (!user) {
    const username = localStorage.getItem('chat-user');
    setUser(username);
  }

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user, setUser }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
