import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '7d';

// ✅ Vérifier si les variables d'environnement sont définies
if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets are missing in environment variables.");
}

// ✅ Génération des tokens (Access + Refresh)
export const generateTokens = (user) => {
    if (!user || !user.id || !user.role) {
        throw new Error("User data is missing for token generation.");
    }

    const accessToken = jwt.sign(
        { id: user.id, role: user.role }, // ✅ Stocke aussi le rôle de l'utilisateur
        JWT_ACCESS_SECRET,
        { expiresIn: JWT_ACCESS_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRATION }
    );

    return { accessToken, refreshToken };
};

// ✅ Vérification du Refresh Token avec une meilleure gestion des erreurs
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Refresh token expiré, veuillez vous reconnecter.');
        }
        throw new Error('Refresh token invalide.');
    }
};

// ✅ Export des constantes pour réutilisation
export {
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION
};


