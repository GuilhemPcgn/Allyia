import bcrypt from 'bcrypt';
import validator from 'validator';
import { User } from '../models/index.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password_hash'] }
        });
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        // Vérification des droits
        if (req.user.id !== userId && req.user.role !== 'medecin') {
            return res.status(403).json({ error: 'Non autorisé' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Validation des données
        const updates = {};

        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Email invalide' });
            }
            const emailExists = await User.findOne({
                where: { email: validator.normalizeEmail(email) },
                where: { id: { [Op.ne]: userId } }
            });
            if (emailExists) {
                return res.status(409).json({ error: 'Cet email est déjà utilisé' });
            }
            updates.email = validator.normalizeEmail(email);
        }

        if (firstname) {
            if (!validator.isLength(firstname, { min: 2, max: 50 })) {
                return res.status(400).json({ error: 'Le prénom doit contenir entre 2 et 50 caractères' });
            }
            updates.firstname = validator.escape(firstname);
        }

        if (lastname) {
            if (!validator.isLength(lastname, { min: 2, max: 50 })) {
                return res.status(400).json({ error: 'Le nom doit contenir entre 2 et 50 caractères' });
            }
            updates.lastname = validator.escape(lastname);
        }

        // Mise à jour du mot de passe si fourni
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ error: 'Le mot de passe actuel est requis' });
            }

            const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
            }

            if (!validator.isLength(newPassword, { min: 8 })) {
                return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' });
            }

            if (!validator.matches(newPassword, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
                return res.status(400).json({
                    error: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                });
            }

            updates.password_hash = await bcrypt.hash(newPassword, 12);
        }

        // Mise à jour de l'utilisateur
        await user.update(updates);

        // Réponse sans le mot de passe
        const { password_hash, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};