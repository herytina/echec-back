import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { setWebSocketServer } from './controllers/partyController';
import router from './router';
import connection from './utils/db.config';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(router);

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion :', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID de connexion', connection.threadId);
});

const server = http.createServer(app);

// Configurer le serveur WebSocket
const wss = new WebSocketServer({ server });
setWebSocketServer(wss); // Passez le serveur WebSocket au contrôleur

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received:', message);
    // Diffuser le message à tous les clients connectés
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
