import app from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger/logger";

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server PORT:${PORT}`);
});