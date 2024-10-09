import { logger } from "@/lib/winston";
import ErrorResponse from "@/types/response/error-response";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorsMiddleware = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (e instanceof ErrorResponse) {
    logger.error(
      `[${req.method.toUpperCase()}] ${req.url} ${e.status} - ${e.message}`
    );

    res.status(e.status).json({
      status: e.status,
      message: e.message,
      name: e.name,
    });
  } else if (e instanceof ZodError) {
    const issues = e.issues
      .map((issue) => ({
        info: issue.message,
      }))
      .map((issue) => issue.info);

    logger.error(
      `[${req.method.toUpperCase()}] ${req.url} - ${issues.join(", ")}`
    );

    res.status(500).json({
      status: 500,
      message: JSON.parse(e.message),
      name: e.name,
    });
  } else {
    logger.error(`[${req.method.toUpperCase()}] ${req.url} - ${e.message}`);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
