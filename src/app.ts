import 'dotenv/config';
import express from 'express';
import loaders from './loaders/index';
import swaggerLoader from './loaders/swagger.js';

const app = express();

await loaders(app);
swaggerLoader(app);

export default app;
