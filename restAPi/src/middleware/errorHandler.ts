import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
  return
};
