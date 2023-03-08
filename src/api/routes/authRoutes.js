import express from 'express';
import * as auth from './../../auth/auth.js';

const router = express.Router();
router.post('/login', auth.login);
router.post('/register', auth.register);

export default router;
