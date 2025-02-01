import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';

const app = express();

await loaders(app);

export default app;
