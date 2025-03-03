import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';
import { deleteUnverifiedUsersController } from './controllers/user-controller.js';
import cron from 'node-cron';

const app = express();

await loaders(app);

// Borra usuarios sin verificar cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
  await deleteUnverifiedUsersController();
  console.log('Función ejecutada cada 5 minutos');
});

export default app;
