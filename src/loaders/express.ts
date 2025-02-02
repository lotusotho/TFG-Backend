import express from 'express';

import { logDate } from '../middlewares/logger-middleware';
import errorHandler from '../middlewares/error-handler';
import router from '../routes/index';

import config from '../config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabase } from '../services/createConnection';

export default async function (server: any) {
  server.use(cookieParser());

  server.use(
    cors({
      origin: true,
      credentials: true,
      methods: 'POST,GET,PUT,OPTIONS,DELETE',
    })
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  await connectDatabase();

  server.use(logDate);
  server.use(router);

  server.use('*', (req: Request, res: any) => {
    res.status(404).send('Not Found');
  });

  server.use(errorHandler);

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
