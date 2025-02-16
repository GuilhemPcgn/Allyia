import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '7d';

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRATION,
    });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION,
    });

    return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        throw new Error('Refresh token invalide ou expiré');
    }
};
console.log(token);

export {
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION
};

