import "dotenv/config";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import morganMiddleware from "./middlewares/winston.middleware";
import appRouter from "./routes";
import logger from "./utils/logger.utils";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use(morganMiddleware);

app.use("/", appRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
