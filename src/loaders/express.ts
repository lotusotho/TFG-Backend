import express from 'express';

import { logDate } from '../middlewares/logger-middleware.js';
import errorHandler from '../middlewares/error-handler.js';
import router from '../routes/index.js';

import config from '../config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabase } from '../services/createConnection.js';

export default async function (server: any) {
  server.use(cors());

  server.use(cookieParser());

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(logDate);
  server.use(router);

  await connectDatabase();

  server.use('*', (req: Request, res: any) => {
    res.status(404).send('Not Found');
  });

  server.use(errorHandler);

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
