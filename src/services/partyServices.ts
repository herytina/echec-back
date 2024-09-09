import connection from '../utils/db.config'; // Assurez-vous que le chemin est correct

export const createPartyInDB = async (partyData: { name: string; mise: number; players: string; status: string; timer:number; createdAt: string; }) => {
  const { name, mise, players, status, timer, createdAt } = partyData;
  const query = 'INSERT INTO party (name, mise, players, status, timer,createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, mise, players, status, timer*60, createdAt, createdAt];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getPartiesFromDB = async () => {
  const query = 'SELECT * FROM party WHERE status = "created"';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
