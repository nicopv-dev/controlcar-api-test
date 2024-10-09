import express from "express";
import { logger } from "./lib/winston";
import cors from "cors";
import { errorsMiddleware } from "./middleware/errors";

import pokemonRoutes from "./api/pokemon/pokemon-routes";

const app = express();
const SERVER_PORT = 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/pokemon", pokemonRoutes);

app.use(errorsMiddleware);

app.listen(3000, () => {
  logger.info(`Server is running on port ${SERVER_PORT}`);
});
