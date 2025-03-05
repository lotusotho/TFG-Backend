import express from 'express';
import { logDate } from '../middlewares/logger-middleware';
import errorHandler from '../middlewares/error-handler';
import router from '../routes/index';
import config from '../config';
import cors from 'cors';
import { connectDatabase } from '../services/createConnection';
import swaggerLoader from './swagger.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export default async function (server: any) {
  server.use(
    cors({
      origin: /https?:\/\/(.*\.)?mapach\.es$/,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    })
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(logDate);

  swaggerLoader(server);

  server.use(router);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const coveragePath = path.join(__dirname, '../../coverage/lcov-report');
  if (fs.existsSync(coveragePath)) {
    server.use('/coverage', express.static(coveragePath));
  } else {
    console.warn(
      'La carpeta de coverage no existe, la ruta /coverage no se ha creado.'
    );
  }

  await connectDatabase();

  server.use('*', (req: Request, res: any, next: any) => {
    res.status(404).send('Not Found');
  });

  server.use(errorHandler);

  server.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
