import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tix',
  password: 'anonyme',
  database: 'chess'
});

export default connection;
