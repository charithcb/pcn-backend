import { Request, Response, NextFunction } from "express";
import { env } from "./env";

const ALLOWED_HEADERS = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
const ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";

const resolveOrigin = (requestOrigin: string | undefined, allowedOrigin: string | string[]) => {
  if (allowedOrigin === "*") {
    return "*";
  }

  if (Array.isArray(allowedOrigin)) {
    if (requestOrigin && allowedOrigin.includes(requestOrigin)) {
      return requestOrigin;
    }

    return allowedOrigin[0] ?? "*";
  }

  return allowedOrigin;
};

export const applySecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  const origin = resolveOrigin(req.headers.origin, env.corsOrigin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Origin", origin);

  if (origin !== "*") {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  res.header("Access-Control-Allow-Methods", ALLOWED_METHODS);
  res.header("Access-Control-Allow-Headers", ALLOWED_HEADERS);

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
};
