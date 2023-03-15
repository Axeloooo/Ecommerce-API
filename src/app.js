import express from "express";
import { apiRouter } from "./routes/api.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
