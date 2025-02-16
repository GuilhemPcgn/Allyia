import { verifyAccessToken } from '../config/jwt.js';
import users from '../models/users.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

export const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await users.findByPk(req.user.id);

            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ error: 'Accès non autorisé' });
            }

            next();
        } catch (error) {
            console.error('Erreur lors de la vérification du rôle', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    };
};