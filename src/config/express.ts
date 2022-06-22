import express from 'express';
import cors from 'cors';
import errorHandler from '../middleware/errorHandler';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/status', (_req, res) => {
    res.send('OK');
  });

  // app.use('/', locationRouter);

  app.use(errorHandler);

  return app;
};

export { createServer };
