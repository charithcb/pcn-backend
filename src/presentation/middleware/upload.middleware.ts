import { NextFunction, Request, Response } from "express";

export const uploadMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  // File upload is not required for the current backend shape. This middleware
  // exists as an extension point for future multipart handling.
  next();
};
