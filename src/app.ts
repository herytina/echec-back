import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
