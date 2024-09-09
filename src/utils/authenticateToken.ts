import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware pour vérifier le token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']; // Récupère l'en-tête Authorization
  const token = authHeader && authHeader.split(' ')[1]; // Extrait le token après "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  // Vérification du token avec le secret utilisé lors de la génération du token
  jwt.verify(token, 'votre_secret_jwt', (err /*, user*/) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }

    // Ajouter l'utilisateur dans la requête (facultatif)
    // req.user = user;

    next(); // Continuer vers le contrôleur si le token est valide
  });
};
