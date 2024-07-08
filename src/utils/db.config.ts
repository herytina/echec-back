import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'anonyme04.',
  database: 'chess_game'
});

export default connection;
