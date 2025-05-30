import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app: Application = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
