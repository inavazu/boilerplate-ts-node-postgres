import express from 'express';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/status', (_req, res) => {
    res.send('OK');
  });

  return app;
};

export { createServer };
