import express from 'express';

import { logDate } from '../middlewares/logger-middleware';
import errorHandler from '../middlewares/error-handler';
import router from '../routes/index';

import config from '../config';
import cors from 'cors';
import { connectDatabase } from '../services/createConnection';

export default async function (server: any) {
  server.use(
    cors({
      origin: /https?:\/\/(.*\.)?mapach\.es$/,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    })
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(logDate);
  server.use(router);

  await connectDatabase();

  server.use('*', (req: Request, res: any, next: any) => {
    res.status(404).send('Not Found');
  });

  server.use(errorHandler);

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
