import { errorHandler } from "./shared/errors/ErrorHandler";
import { AppError } from "./shared/errors/AppError";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.get("/", (_req, res) => {
  res.send("API is running!");
});

app.get("/api/v1/test-error", () => {
  throw new AppError(
    "Test Error",
    400
  );
});

app.use(errorHandler);

export default app;