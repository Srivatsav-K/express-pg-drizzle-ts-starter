import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import morganMiddleware from "./middlewares/winston.middleware";
import appRouter from "./routes";
import logger from "./utils/logger.utils";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN!),
    credentials: true, // Allows headers (cookies) //? Check CSRF
  })
);
app.use(morganMiddleware);

app.use("/", appRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});

// Top-level error handlers
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception thrown:", error);
  process.exit(1);
});
