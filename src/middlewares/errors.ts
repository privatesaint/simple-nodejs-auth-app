import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  const error = { ...err };
  error.message = err.message || "Internal Server Error.";

  if (Array.isArray(err)) {
    req.flash("errors", err);
  }

  return res.redirect(req.session.returnTo || "/");
};
