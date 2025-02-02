import express from 'express';
import errorHandler from '../middlewares/error-handler';
import router from '../routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabase } from '../services/createConnection';
import { logDate } from '../middlewares/logger-middleware.js';
import config from '../config.js';

export default async function (server: any) {
  const allowedOrigins = ['https://blog.mapach.es'];

  server.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    })
  );

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
