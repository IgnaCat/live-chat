const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

const users = [];

app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Server running</h1>');
});

io.on('connection', (socket) => {
  socket.on('online', (name) => {
    users.push({ id: socket.id, name: name });
    console.log('user logged: ' + JSON.stringify(users));
    io.emit('online', users);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + JSON.stringify(msg));
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1)[0];
    }
    console.log(JSON.stringify(users));
    io.emit('online', users);
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});
