import { Response, Request, NextFunction } from "express";
import catchAsyncError from "../../middlewares/catchAsyncError";
/**
 * @description Show user dashboard
 * @route GET /home
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const home = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.render("dashboard/home", { user: req.user });
  }
);
