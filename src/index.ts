import express from "express";
import { logger } from "./lib/winston";
import cors from "cors";

const app = express();
const SERVER_PORT = 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  logger.info(`Server is running on port ${SERVER_PORT}`);
});
