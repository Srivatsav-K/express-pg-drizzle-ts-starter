import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { healthCheckRouter } from "./healthcheck.routes";

const appRouter = Router();

// Health check
appRouter.use(`/api/health-check`, healthCheckRouter);

appRouter.all("*", (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
});

export default appRouter;
