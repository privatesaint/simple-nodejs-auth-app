import passport from "passport";
import passportLocal from "passport-local";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user/user";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.query()
    .findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

/**
 * Authenticate user
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.query()
      .findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Invalid credential" });
        }

        // compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid credential" });
          }
        });
      })
      .catch((err) => done(err));
  })
);
