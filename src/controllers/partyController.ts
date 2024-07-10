import { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createPartyInDB, getPartiesFromDB } from '../services/partyServices';
import connection from '../utils/db.config';

let wss: WebSocketServer; // Déclarez une variable pour le serveur WebSocket

export const setWebSocketServer = (webSocketServer: WebSocketServer) => {
  wss = webSocketServer; // Assignez le serveur WebSocket
};
// GET - Récupérer toutes les parties
export const getParties = (req: Request, res: Response) => {
  connection.query('SELECT * FROM party where status = "created"', (err, results) => {
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
  connection.query('SELECT * FROM party WHERE id = ?', [parseInt(id)], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    if (results) {
      res.status(200).json(results);

      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ event: 'playIn', data: results }));
        }
      });
    } else {
      res.status(404).json({ message: 'Partie non trouvée' });
    }
  });
};

// POST - Créer une nouvelle partie
export const createParty = async (req: Request, res: Response) => {
  try {
    const { name, mise, players, status } = req.body;
    const createdAt = new Date().toLocaleDateString();

    const results = await createPartyInDB({ name, mise, players, status, createdAt });

    const parties = await getPartiesFromDB();

    res.status(200).json({
      message: 'Partie créée avec succès',
      partyId: results, // ID de la partie créée
      parties: parties, // Résultats de la requête getParties
    });

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ event: 'newParty', data: parties }));
        }
      });
  } catch (err) {
    console.error('Erreur lors de la création de la partie ou de la récupération des parties :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT - Mettre à jour une partie par son ID
export const updateParty = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, status } = req.body;
  const updatedAt = new Date().toLocaleDateString()

  connection.query('UPDATE party SET players = ?, status = ?, updatedAt = ? WHERE id = ?', [userId, status, updatedAt, parseInt(id)], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(200).json(results);
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ event: 'letsPlay', data: {status:status, id:id} }));
        }
      });
  });
};

// PUT - party board

export const updateBoardByPartyId = (req: Request) => {
  const { id } = req.params
  const { board, status, currentPlayer, isTopTimer, isBottomTimer, selectedPiece } = req.body
  // const updatedAt = new Date().toLocaleDateString()

  // connection.query('UPDATE party SET board = ?, updatedAt = ? WHERE id =?', [board, updatedAt, parseInt(id)],)
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ event: 'upBoard', data: {board:board, status:status, currentPlayer:currentPlayer,id:id,isTopTimer:isTopTimer,isBottomTimer:isBottomTimer, selectedPiece:selectedPiece } }));
    }
  });
}

// DELETE - Supprimer une partie par son ID
export const deleteParty = (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query('DELETE FROM party WHERE id = ?', [parseInt(id)], (err) => {
    if (err) {
      console.error('Erreur lors de la suppression de la partie :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(200).json({ message: 'Partie supprimée avec succès' });
  });
};
