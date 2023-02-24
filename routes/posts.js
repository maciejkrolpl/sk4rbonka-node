import express from 'express';
import { getChildren, getChild, insertChild } from '../controllers/children.js';
const router = express.Router();
router.get('/child/', getChildren);
router.get('/child/:id', getChild);
router.post('/child/', insertChild)
// router.post('/', createPost);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
export default router;