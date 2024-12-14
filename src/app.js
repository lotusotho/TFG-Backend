import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index.js';
import { listUsers } from './models/methodsDB.js';

const app = express(express.json());

loaders(app);

listUsers();

export default app;
