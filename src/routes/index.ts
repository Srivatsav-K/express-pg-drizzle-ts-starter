import { Router } from "express";

const appRouter = Router();

appRouter.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

appRouter.all("*", (_, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default appRouter;
