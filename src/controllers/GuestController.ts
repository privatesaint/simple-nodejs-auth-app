import { Response, Request, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";

/**
 * @description Show main page
 * @route GET /
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const welcome = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.render("welcome");
  }
);
