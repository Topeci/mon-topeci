import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    "Le serveur est en cours d'exécution sur le port " + port.toString()
  );
});
