import { errorHandler } from "./shared/errors/ErrorHandler";
import { AppError } from "./shared/errors/AppError";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.get("/test-error", () => {
  throw new AppError(
    "Test Error",
    400
  );
});

app.use(errorHandler);

export default app;