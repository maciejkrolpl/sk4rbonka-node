import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import client from './db/db.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/posts', postRoutes);
client
  .connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('connection error', err.stack))
app.listen(8000)