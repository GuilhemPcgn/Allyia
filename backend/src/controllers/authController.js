import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import nodemailer from 'nodemailer';
import users from '../models/users.js';

//config nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// générer token accès + raffraichissement
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expires: '7d' });

    return { accessToken, refreshToken };
};

// valider email
const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
        throw new Error('Email invalide');
    }
};

// valider password
const validatePassword = (password) => {
    if (!validator.isLength(password, { min: 8 })) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
    if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
        throw new Error('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial');
    }
};

// inscription nouvel utilisateur
export const register = async (requestAnimationFrame, res) => {
    try {
        const { email, password, firstname, lastname, phone, adress, birthdate, sex, role = 'Patient' } = req.body;

        validateEmail(email);
        validatePassword(password);
        
        if (!validator.isLength(firstname, { min: 2, max: 100 })) {
            throw new Error('Le prénom doit contenir entre 2 et 100 caractères');
        }

        if (!validator.isLength(lastname, { min: 2, max: 100 })) {
            throw new Error('Le nom doit contenir entre 2 et 100 caractères');
        }

        // verif si email existe
        const existingUser = await users.findOne({ where: {email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Cet email est déjà utilisé' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // création user dans la DB
        const user = await users.create({
            email: validator.normalizeEmail(email),
            password_hash: hashedPassword,
            firstname: validator.escape(firstname),
            lastname: validator.escape(lastname),
            phone: phone ? validator.escape(phone) : null,
            adress: adress ? validator.escape(adress) : null,
            birthdate: birthdate,
            sex: sex,
            role: role
        });

        // génération tokens
        const tokens = generateTokens(user.user_id);

        // envoi email bienvenue
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Bienvenue chez Allyia',
            text: `Bonjour ${firstname},\n\n
                    Bienvenue sur notre plateforme. Votre compte à été créé avec succès.\n\n
                    A bientôt sur Allyia !`
        });

        // réponseuser + token
        res.status(201).json({
            user : {
                user_id: user.user_id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Erreur lors de l\inscription: ', error);
    res.status(400).json({ error: error.message });
    }
};

//  connexion user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // valide les données
        validateEmail(email);
        if (!password) {
            throw new Error('Le mot de passe est requis');
        }

        // recherche du user dans la DB
        const user = await users.findOne({
            where: { email: validator.normalizeEmail(email) }
        });

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect'});
        }

        // verif password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // génère tokens
        const tokens = generateTokens(user.user_id);

        // res infos user + tokens
        res.json({
            user: {
                user_id: user.user_id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Erreur lors de la connexion: ', error);
        res.status(400).json({ error: error.message });
    }
};

// rafraichir token d'accès
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token manquant' });
    }

    // validation refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await users.findByPk(decoded.userId);

    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // nouveau token
    const tokens = generateTokens(user.user_id);

    // res nouveau tokens
    res.json(tokens);
    } catch (error) {
        console.error('Erreur lors du refresh token', error);
        res.stattus(401).json({ error: 'Refresh token invalide' });
    }
};

// reinitialisation password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // validation email
        validateEmail(email);

        // recherche user DB
        const user = await users.findOne({
            where: { email: validator.normalizeEmail(email) }
        });

        if (!user) {
            return res.status(404).json({ error: 'Aucun compte associé à cet email' });
        }

        // token de reinitialisation password
        const resetToken = jwt.sign(
            {userId: users.user_id },
            process.env.JWT_RESET_SECRET,
            { expiresIn: '1h' }
        );

        // email reinitialisation password
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Bonjour ${firstname},\n\n
                    Vous avez demandé une réinitialisation de votre mot de passe.\n
                    Veuillez cliquer sur le lien suivant pour choisir un nouveau mot de passe:\n
                    ${resetUrl}\n\n
                    Ce lien expirera dans 1 heure.\n\n
                    Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.\n\n
                    A bientôt sur Allyia!`
        });

        //confirmation envoi email
        res.json({ message: 'Email de réinitialisation envoyé' });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation', error);
        res.status(400).json({ error: error.message });
    }
};

// reset password
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        // validation password
        validatePassword(password);

        // verif token reinitialisation
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const user = await users.findByPk(decoded.user.Id);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // hash nouveau password
        const hashedPassword = await bcrypt.hash(password, 12);
        await user.update({ password_hash: hashedPassword });

        // envoi email confirmation
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: user.email,
            subject: 'Votre mot de passe a été modifié',
            text: `Bonjour ${user.firstname},\n\n
                    Votre mot de passe a été modifié avec succès.\n\n
                    Si vous n'êtes pas à l'origine de cette modification co,ntactez nous immédiatement.\n\n
                    A bientôt sur Allyia!`
        });

        // res confirmation nouveau password
        res.json({ message: 'Mot de passe modifié avec succès' });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
        res.status(400).json({ error: error.message });
    }
};