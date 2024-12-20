import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import loaders from './loaders/index';
import { listUsers } from './services/methodsDB';
import cors from 'cors';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

loaders(app);

listUsers();

export default app;
