import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./src/router/mainRouter.mjs";
import sequelize from "./src/database.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.use(mainRouter);

//erreur middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur est survenue !" });
});

// Gestion des erreurs 404 (Route inexistante)
app.use((req, res, next) => {
  res
    .status(404)
    .render("error", { message: "La page demandée n'a pas pu être trouvée" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

