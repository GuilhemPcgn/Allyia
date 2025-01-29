import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
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
