import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';
import { deleteUnverifiedUsersController } from './controllers/user-controller.js';

const app = express();

await loaders(app);

// Borra usuarios sin verificar. max 1 día
setTimeout(async () => {
  await deleteUnverifiedUsersController();
  console.log('Función ejecutada después de 5 minutos');
}, 5 * 60 * 1000); // 5 min

export default app;
