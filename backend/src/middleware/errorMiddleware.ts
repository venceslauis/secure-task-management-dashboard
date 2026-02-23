import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  let message = "Internal Server Error";

  if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    message,
  });
};
