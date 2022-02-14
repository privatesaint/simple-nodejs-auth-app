import * as dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import { Model } from "objection";
import { engine } from "express-handlebars";
import path from "path";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import MemoryStore from "memorystore";

dotenv.config();

import knexClient from "./config/connectionInstance";
import routes from "./routes";
import ErrorHandler from "./utils/ErrorHandler";
import errorMiddleware from "./middlewares/errors";

// import passport config
import "./config/passport";

const app = express();

// config cors
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Give the knex instance to objection.
Model.knex(knexClient);

// set
app.set("trust proxy", 1);

// setup view engine
app.engine(
  ".hbs",
  engine({
    partialsDir: path.join(__dirname, "./views/layouts/partials"),
    layoutsDir: path.join(__dirname, "./views/layouts"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

const MemoryStoreInstance = MemoryStore(session);

const secret = process.env.SESSION_KEY;
if (!secret) {
  console.log("SESSION_KEY is required");
  process.exit(1);
}
app.use(
  session({
    store: new MemoryStoreInstance({ checkPeriod: 24 * 60 * 60 * 1000 }),

    secret,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
    resave: false,
    saveUninitialized: true,
  })
);

// setup flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setup static files
app.use("/files", express.static("src/public"));

app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.writeHead(200, { "Content-Type": "image/x-icon" }).end();
  }
  next();
});

// routes
app.use(routes);

// error handlers
app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
);

// error handler
app.use(errorMiddleware);

export default app;
