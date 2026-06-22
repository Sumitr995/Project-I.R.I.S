# I.R.I.S — Express + TypeScript backend

## Quick start

```bash
cp .env.example .env        # then edit PORT, NODE_ENV
npm install
npm run dev                 # tsx watch — hot reload
npm run build               # tsc → dist/
npm start                   # node dist/server.js
```

## Project structure

```
src/
  server.ts                 # entrypoint — imports app, starts listening
  app.ts                    # Express app setup (helmet, cors, json, routes, error handler)
  config/env.ts             # dotenv wrapper — exports env object
  modules/{name}/           # feature modules (auth/ is the only one)
    {name}.controller.ts
    {name}.service.ts
    {name}.repository.ts
    {name}.routes.ts
    {name}.schema.ts        # Zod validation schemas
    {name}.dto.ts
  shared/
    errors/AppError.ts      # custom error class with statusCode
    errors/ErrorHandler.ts  # Express error middleware
    logger/logger.ts        # Pino with pino-pretty in dev
    responses/apiResponse.ts# successResponse / errorResponse helpers
```

## Architecture conventions

- **Module pattern**: controller → service → repository. Each layer is a class.
- **Validation**: Zod schemas in `*.schema.ts`, parse with `schema.parse()`.
- **Error handling**: throw `AppError(message, statusCode)`. The error handler middleware catches it and returns `{ success: false, message }`.
- **Responses**: use `successResponse(data, message)` and `errorResponse(message)` from `src/shared/responses/apiResponse.ts`.
- **Logging**: `import { logger } from "@/shared/logger/logger"` → Pino instance. Pretty-printed in dev, JSON in production.

## Module wiring

Each module exports routes via `{name}.routes.ts`. Wire them in `src/app.ts`:

```ts
import authRoutes from "./modules/auth/auth.routes";
app.use("/api/v1/auth", authRoutes);
```

## Environment

| Variable   | Default       | Required |
|------------|---------------|----------|
| `PORT`     | `"5000"`      | no       |
| `NODE_ENV` | `"development"` | no     |

## Known quirks

- `tsconfig.json` targets ES2022 with `"module": "CommonJS"` but `package.json` sets `"type": "module"`. This is inconsistent — consult the team before changing.
- ESLint and Prettier are listed as devDependencies but have **no config files**. They are not wired into any script or check.
- No test framework or test files exist yet.
- `docker/`, `docs/`, `src/infrastructure/`, `src/middleware/`, `src/shared/types/` are all empty — intended for future use.
- Auth module files are stubs (empty routes, empty DTO, empty classes). `app.ts` does not yet import any module routes.
