import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'hery',
  password: 'hery',
  database: 'chess_game'
});

export default connection;
