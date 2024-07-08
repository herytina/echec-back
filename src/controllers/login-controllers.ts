import { Request, Response } from 'express';
import connection from '../utils/db.config';

// GET - Récupérer toutes les parties
export const loginControllers = (req: Request, res: Response) => {
  const { name, pwd } = req.body;
  connection.query('SELECT * FROM users WHERE name = ? and pwd = ?', [name,pwd], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'user non trouvée' });
    }
  });
};
