import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index.js';

const app = express(express.json());

loaders(app);

export default app;
