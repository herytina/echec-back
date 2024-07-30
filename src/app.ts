import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import router from './router';
import connection from './utils/db.config';
import SocketService from './services/socketServices';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:8080', // Remplacez par l'URL de votre client Vue.js
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);
const socketService = new SocketService(server)
const io = socketService.getIO();

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('gameBoardUpdated', (data) => {
    socket.broadcast.emit('gameBoardUpdated', data);
  });

  socket.on('partyListUpdated', (data) => {
    socket.broadcast.emit('partyListUpdated', data);
  });

  socket.on('newParty', (data) => {
    socket.broadcast.emit('newParty', data);
  });

  socket.on('partySelected', (data) => {
    console.log('partySelected event received:', data);
    socket.broadcast.emit('partySelected', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion :', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID de connexion', connection.threadId);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export {io}
