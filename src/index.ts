import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import appRouter from "./routes";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use("/", appRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
