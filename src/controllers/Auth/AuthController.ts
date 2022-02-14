import { Response, Request, NextFunction } from "express";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { UserService } from "../../services";
import catchAsyncError from "../../middlewares/catchAsyncError";
import SignUpValidator from "../../validations/auth/SignUp";
import LoginValidator from "../../validations/auth/Login";

/**
 * @description Show Login Form
 * @route GET /login
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const showLoginForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = req.flash("errors");

    return res.render("auth/login", { errors, success: req.flash("success") });
  }
);

/**
 * @description Authenticate user
 * @route POST /login
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // redirect back if error
    req.session.returnTo = "/login";

    await LoginValidator(req.body);

    // clear redirect session
    req.session.returnTo = null;

    passport.authenticate("local", (err: Error, user, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.flash("errors", info.message);

        return res.redirect("/login");
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.redirect("/home");
      });
    })(req, res, next);
  }
);

/**
 * @description Show Register Form
 * @route GET /signup
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const showRegisterForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = req.flash("errors");

    return res.render("auth/signup", { errors });
  }
);

/**
 * @description Create an account
 * @route POST /signup
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // redirect back if error
    req.session.returnTo = "/register";

    const validatedData = await SignUpValidator(req.body);

    // clear redirect session
    req.session.returnTo = null;

    await UserService.createAccount(validatedData);

    req.flash("success", "Account created Successfully");

    return res.redirect("/login");
  }
);

/**
 * @description Logout
 * @route GET /logout
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(function (err) {
      req.logout();
      res.redirect("/");
    });
  }
);
