import express from "express";
import cors from "cors";
import helmet from "helmet";

import { requestContext } from "./middlewares/requestContext.ts";
import { requestLogger } from "./middlewares/requestLogger.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { notFound } from "./middlewares/notFound.ts";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(requestContext);
app.use(requestLogger);

app.get("/health", (_, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);

app.use(errorHandler);

export default app;