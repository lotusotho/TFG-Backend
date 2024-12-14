import express from 'express';

import { logDate } from '../middlewares/logger-middleware.js';
import errorHandler from '../middlewares/error-handler.js';
import router from '../routes/index.js';

import config from '../config.js';

export default function (server) {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(logDate);
  server.use(router);

  server.use('*', (req, res) => {
    res.status(404).send('Not Found');
  });

  server.use(errorHandler);

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
