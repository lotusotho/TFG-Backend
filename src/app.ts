import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';
import { listUsers } from './services/methodsDB';

const app = express();
app.use(express.json());

loaders(app);

listUsers();

export default app;
