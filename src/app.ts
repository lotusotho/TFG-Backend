import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';
import { deleteUnverifiedUsersController } from './controllers/user-controller.js';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const app = express();

await loaders(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! Procesos after deployment
// Poner ruta /coverage después de 1.5 min
setTimeout(() => {
  const coveragePath = path.join(__dirname, '../../coverage/lcov-report');
  if (fs.existsSync(coveragePath)) {
    app.use('/coverage', express.static(coveragePath));
  } else {
    console.warn(
      'La carpeta de coverage no existe, la ruta /coverage no se ha creado.'
    );
  }
}, 90000);

// Borra usuarios sin verificar cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
  await deleteUnverifiedUsersController();
  console.log('Función ejecutada cada 5 minutos');
});

export default app;
