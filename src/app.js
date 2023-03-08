import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './api/routes/authRoutes.js';
import childRoutes from './api/routes/childRoutes.js';
import familyRoutes from './api/routes/familyRoutes.js';
import parentRoutes from './api/routes/parentRoutes.js';
import transferRoutes from './api/routes/transferRoutes.js';
import client from './config/db.js';
import logger from './utils/logger.js';

import { checkIsAuthorized } from './auth/auth.js';

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/child', checkIsAuthorized(), childRoutes);
app.use('/transfer', transferRoutes);
app.use('/parent', parentRoutes);
app.use('/family', familyRoutes);
app.use('/auth', authRoutes);
client
    .connect()
    .then(() => {
        logger.info(`Database connected.`);
        app.listen(port, () =>
            logger.info(`Server listening on port ${port}.`)
        );
    })
    .catch((error) => {
        const errorPayload = { ...error, stack: error.stack };
        logger.error(errorPayload);
    });
