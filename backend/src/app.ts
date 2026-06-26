import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { requestContext } from './middlewares/requestContext.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(requestContext);
app.use(requestLogger);

app.get('/health', (_, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);

app.use(errorHandler);

export default app;
