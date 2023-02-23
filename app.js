import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import './db/db.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/posts', postRoutes)
app.listen(8000)