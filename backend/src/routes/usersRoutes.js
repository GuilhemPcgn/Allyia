import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import { authenticateToken, checkRole } from '../middleware/auth.js';

const userRouter = express.Router(); //

userRouter.use(authenticateToken);

// Seuls les médecins peuvent voir la liste de tous les utilisateurs
userRouter.get('/', checkRole(['medecin']), getAllUsers);

// Un utilisateur peut voir son propre profil
userRouter.get('/:id', getUserById);

export default userRouter;
