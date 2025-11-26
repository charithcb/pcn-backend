import { Request, Response, NextFunction } from "express";

const ALLOWED_HEADERS = "Origin, X-Requested-With, Content-Type, Accept, Authorization";

export const applySecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", ALLOWED_HEADERS);

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
};
