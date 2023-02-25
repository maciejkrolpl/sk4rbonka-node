import express from 'express';
import { getChildren, getChild, createChild } from '../controllers/childController.js';
const router = express.Router();
router.get('/', getChildren);
router.get('/:id', getChild);
router.post('/', createChild)
export default router;