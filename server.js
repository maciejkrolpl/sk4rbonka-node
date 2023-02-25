import express from 'express';
import cors from 'cors';
import childRoutes from './routes/childRoutes.js'
import transferRoutes from './routes/transferRoutes.js';
import client from './db/db.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/child', childRoutes);
app.use('/transfers', transferRoutes);
client
  .connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('connection error', err.stack))
app.listen(8000)