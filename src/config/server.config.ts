import express from "express";
import { registerRoutes } from "../presentation/routes";
import { errorMiddleware, notFoundMiddleware } from "../presentation/middleware/error.middleware";
import { applySecurityHeaders } from "./app.config";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(applySecurityHeaders);

  registerRoutes(app);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};
