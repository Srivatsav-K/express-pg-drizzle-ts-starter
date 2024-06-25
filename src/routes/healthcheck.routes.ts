import { Router } from "express";
import { healthCheckController } from "../controllers/healthcheck.controller";

export const healthCheckRouter = Router();

healthCheckRouter.get("/", healthCheckController);
