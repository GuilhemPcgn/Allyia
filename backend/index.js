import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/usersRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5848;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});








// import express from 'express';
// import session from "express-session";
// import cors from 'cors';
// import sequelize from './src/config/database.js';
// import { register } from "./src/controllers/authController.js";


// import dotenv from 'dotenv';

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }));

// app.use(express.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// // Test database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


// // Add error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     message: 'Something broke!',
//     error: err.message
//   });
// });

// //routes
// app.post('http://localhost:5848/api/auth/register', register);


// // Database sync and server start
// const PORT = process.env.PORT || 3001;

// sequelize.sync()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to sync database:', err);
//   });






// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";


// // dotenv.config();
// // const app = express();
// // const port = process.env.PORT || 5000;


// // //middlewares
// // app.use(express.json());

// // // configuration CORS
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // app.use(express.json());
// // app.use(session({
// //   secret: process.env.SESSION_SECRET,
// //   resave: false,
// //   saveUninitialized: false,
// //   cookie: {
// //     secure: process.env.NODE_ENV === 'production',
// //     httpOnly: true,
// //     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// //   }
// // }));

// // //routes
// // const authController = require('./src/controllers/authController.js');
// // app.post('/api/auth/signup', authController.register);


// // // Database connection and server start
// // const PORT = process.env.PORT || 5848;

// // sequelize.sync()
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //   })
// //   .catch(err => {
// //     console.error('Unable to connect to the database:', err);
// //   });


// // //erreur middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ error: "Une erreur est survenue !" });
// // });

// // // Gestion des erreurs 404 (Route inexistante)
// // app.use((req, res, next) => {
// //   res.status(404).json({ error: "La page demandée n'a pas pu être trouvée" });
// // });


// // // Démarrage du serveur
// // app.listen(port, () => {
// //   console.log(`Serveur lancé sur http://localhost:${port}`);
// // });

