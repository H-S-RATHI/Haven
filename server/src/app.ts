import express, { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { connectDB } from './utils/db';
import { initSocket } from './socket';

const app: Application = express();
const server = createServer(app);

// Initialize WebSocket server
export const io = initSocket(server);

// Connect to MongoDB
connectDB();

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

// Start the server
const PORT = config.port || 5000;

// Only start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app, server };
