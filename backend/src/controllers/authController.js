import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
    console.log("Signup route hit!");
    console.log("Receive data:", req.body);
    
    // Vérification des erreurs de validation
    // const errors = validationResult(req);
    // console.log("Errors:", errors);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const { firstname, lastname, email, phone, adress, birthdate, sex, role, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await User.create({
            firstname,
            lastname,
            email,
            phone,
            adress,
            birthdate,
            sex,
            role,
            password_hash: hashedPassword, // Stocker le mot de passe haché
        });

        console.log('string');


        // console.log("New user created:", User.toJson());
        // Générer un token JWT pour éviter un login manuel
        // const token = jwt.sign(
        //     { id: user.user_id, email: user.email, role: user.role }, 
        //     process.env.JWT_SECRET, 
        //     { expiresIn: '1h' }
        // );


        // Ne pas renvoyer le mot de passe haché au client
        return res.status(201).json({ 
            message: 'Utilisateur créé avec succès', 
            user: {
                id: user.user_id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                adress: user.adress,
                birthdate: user.birthdate,
                sex: user.sex,
                role: user.role
            },
            // token // Envoyer le token JWT
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erreur serveur : ' + error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};








// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import validator from 'validator';
// import nodemailer from 'nodemailer';
// import { User } from '../models/index.js';

// // Configuration de nodemailer
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: true,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//     }
// });

// const generateTokens = (userId) => {
//     const accessToken = jwt.sign(
//         { userId },
//         process.env.JWT_ACCESS_SECRET,
//         { expiresIn: '15m' }
//     );

//     const refreshToken = jwt.sign(
//         { userId },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: '7d' }
//     );

//     return { accessToken, refreshToken };
// };

// const validateEmail = (email) => {
//     if (!validator.isEmail(email)) {
//         throw new Error('Email invalide');
//     }
// };

// const validatePassword = (password) => {
//     if (!validator.isLength(password, { min: 8 })) {
//         throw new Error('Le mot de passe doit contenir au moins 8 caractères');
//     }
//     if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
//         throw new Error('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial');
//     }
// };

// export const register = async (req, res) => {
//     try {
//         const { email, password, firstname, lastname, role = 'patient' } = req.body;

//         // Validation
//         validateEmail(email);
//         validatePassword(password);

//         if (!validator.isLength(firstname, { min: 2, max: 50 })) {
//             throw new Error('Le prénom doit contenir entre 2 et 50 caractères');
//         }

//         if (!validator.isLength(lastname, { min: 2, max: 50 })) {
//             throw new Error('Le nom doit contenir entre 2 et 50 caractères');
//         }

//         // Vérification si l'email existe déjà
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(409).json({ error: 'Cet email est déjà utilisé' });
//         }

//         // Hashage du mot de passe
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Création de l'utilisateur
//         const user = await User.create({
//             email: validator.normalizeEmail(email),
//             password_hash: hashedPassword,
//             firstname: validator.escape(firstname),
//             lastname: validator.escape(lastname),
//             role: validator.escape(role)
//         });

//         // Génération des tokens
//         const tokens = generateTokens(user.id);

//         // Envoi d'email de bienvenue
//         await transporter.sendMail({
//             from: process.env.SMTP_FROM,
//             to: email,
//             subject: 'Bienvenue sur notre plateforme',
//             text: `Bonjour ${firstname},\n\nBienvenue sur notre plateforme de santé. Votre compte a été créé avec succès.\n\nCordialement,\nL'équipe`
//         });

//         res.status(201).json({
//             user: {
//                 id: user.id,
//                 email: user.email,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 role: user.role
//             },
//             ...tokens
//         });
//     } catch (error) {
//         console.error('Erreur lors de l\'inscription:', error);
//         res.status(400).json({ error: error.message });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validation
//         validateEmail(email);
//         if (!password) {
//             throw new Error('Le mot de passe est requis');
//         }

//         // Recherche de l'utilisateur
//         const user = await User.findOne({
//             where: { email: validator.normalizeEmail(email) }
//         });

//         if (!user) {
//             return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
//         }

//         // Vérification du mot de passe
//         const isValidPassword = await bcrypt.compare(password, user.password_hash);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
//         }

//         // Génération des tokens
//         const tokens = generateTokens(user.id);

//         res.json({
//             user: {
//                 id: user.id,
//                 email: user.email,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 role: user.role
//             },
//             ...tokens
//         });
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         res.status(400).json({ error: error.message });
//     }
// };

// export const refreshToken = async (req, res) => {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) {
//             return res.status(400).json({ error: 'Refresh token manquant' });
//         }

//         // Vérification du refresh token
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//         const user = await User.findByPk(decoded.userId);

//         if (!user) {
//             return res.status(401).json({ error: 'Utilisateur non trouvé' });
//         }

//         // Génération de nouveaux tokens
//         const tokens = generateTokens(user.id);

//         res.json(tokens);
//     } catch (error) {
//         console.error('Erreur lors du refresh token:', error);
//         res.status(401).json({ error: 'Refresh token invalide' });
//     }
// };

// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Validation
//         validateEmail(email);

//         const user = await User.findOne({
//             where: { email: validator.normalizeEmail(email) }
//         });

//         if (!user) {
//             return res.status(404).json({ error: 'Aucun compte associé à cet email' });
//         }

//         // Génération d'un token de réinitialisation
//         const resetToken = jwt.sign(
//             { userId: user.id },
//             process.env.JWT_RESET_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Envoi de l'email de réinitialisation
//         const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

//         await transporter.sendMail({
//             from: process.env.SMTP_FROM,
//             to: email,
//             subject: 'Réinitialisation de votre mot de passe',
//             text: `Bonjour,\n\nVous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour procéder :\n\n${resetUrl}\n\nCe lien est valable pendant 1 heure.\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.\n\nCordialement,\nL'équipe`
//         });

//         res.json({ message: 'Email de réinitialisation envoyé' });
//     } catch (error) {
//         console.error('Erreur lors de la demande de réinitialisation:', error);
//         res.status(400).json({ error: error.message });
//     }
// };

// export const resetPassword = async (req, res) => {
//     try {
//         const { token, password } = req.body;

//         // Validation
//         validatePassword(password);

//         // Vérification du token
//         const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
//         const user = await User.findByPk(decoded.userId);

//         if (!user) {
//             return res.status(404).json({ error: 'Utilisateur non trouvé' });
//         }

//         // Mise à jour du mot de passe
//         const hashedPassword = await bcrypt.hash(password, 12);
//         await user.update({ password_hash: hashedPassword });

//         // Envoi d'email de confirmation
//         await transporter.sendMail({
//             from: process.env.SMTP_FROM,
//             to: user.email,
//             subject: 'Votre mot de passe a été modifié',
//             text: `Bonjour,\n\nVotre mot de passe a été modifié avec succès.\n\nSi vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.\n\nCordialement,\nL'équipe`
//         });

//         res.json({ message: 'Mot de passe modifié avec succès' });
//     } catch (error) {
//         console.error('Erreur lors de la réinitialisation du mot de passe:', error);
//         res.status(400).json({ error: error.message });
//     }
// };
