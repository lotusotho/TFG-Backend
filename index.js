import express from 'express';
import PORT from './config.js';

const app = express(express.json());

app.listen(PORT, () => {
  console.log('Escuchando en el puerto ' + PORT);
});
