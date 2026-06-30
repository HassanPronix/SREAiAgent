import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { requestContext } from './middlewares/requestContext.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import healthRoute from './routes/health.routes.js'
import incidentRoutes from './routes/incident.routes.js'
import chatRoutes from './routes/chat.routes.js'
import messageRoutes from './routes/message.routes.js'

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(requestContext);
app.use(requestLogger);

app.use('/api', healthRoute);
app.use('/api/incidents', incidentRoutes)
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes)

app.use(notFound);

app.use(errorHandler);

export default app;
