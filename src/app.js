import cors from 'cors';
import express from 'express';
import client from './config/db.js';
import logger from './utils/logger.js';
import childRoutes from './api/routes/childRoutes.js';
import transferRoutes from './api/routes/transferRoutes.js';

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/child', childRoutes);
app.use('/transfers', transferRoutes);
client
  .connect()
  .then(() => logger.info(`Database connected.`))
  .catch((error) => {
    const errorPayload = {...error, stack:error.stack};
    logger.error(errorPayload);
  });
app.listen(port, () => logger.info(`Server listening on port ${port}.`))