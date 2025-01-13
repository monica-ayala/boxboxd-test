import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  currentUser?: any; 
}

export const authentification = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = header.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.currentUser = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token", error: err });
  }
};
