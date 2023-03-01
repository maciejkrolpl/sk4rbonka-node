import express from 'express';
import * as controller from './../controllers/parentController.js';
const router = express.Router();
router.get('/', controller.getParents);
router.get('/:id', controller.getParentById);
router.post('/', controller.createParent);
export default router;