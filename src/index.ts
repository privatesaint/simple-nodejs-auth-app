import app from "./app";

const PORT: number = parseInt(process.env.PORT as string, 10) || 4500;

process.on("SIGINT", () => {
  console.warn("Shutting down server...");
  console.log(`Server successfully shutdown at ${Date.now()}`);
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🔥`);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  process.exit(1);
});
