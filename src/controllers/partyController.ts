import { Request, Response } from 'express';
import connection from '../utils/db.config';

// GET - Récupérer toutes les parties
export const getParties = (req: Request, res: Response) => {
  connection.query('SELECT * FROM party', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des parties :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(200).json(results);
  });
};

// GET - Récupérer une partie par son ID
export const getPartyById = (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query('SELECT * FROM party WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    if (results) {
      res.status(404).json({ message: 'Partie non trouvée' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// POST - Créer une nouvelle partie
export const createParty = (req: Request, res: Response) => {
  const { name, mise, userId1, userId2 } = req.body;
  connection.query('INSERT INTO party (name, mise, userId1, userId2) VALUES (?, ?, ?, ?)', [name, mise, userId1, userId2], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(201).json({ id: results, name, mise, userId1, userId2 });
  });
};

// PUT - Mettre à jour une partie par son ID
export const updateParty = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, mise, userId1, userId2 } = req.body;
  connection.query('UPDATE party SET name = ?, mise = ?, userId1 = ?, userId2 = ? WHERE id = ?', [name, mise, userId1, userId2, id], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(200).json({ id, name, mise, userId1, userId2 });
  });
};

// DELETE - Supprimer une partie par son ID
export const deleteParty = (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query('DELETE FROM party WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(200).json({ message: 'Partie supprimée avec succès' });
  });
};
