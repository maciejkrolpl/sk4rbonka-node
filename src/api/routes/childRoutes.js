import express from 'express';
import * as controller from './../controllers/childController.js';
import { checkIsAuthorized } from '../../auth/auth.js';

const router = express.Router();
router.get('/', checkIsAuthorized(['admin']), controller.getChildren);
router.get('/family/:user_id', controller.getChildrenByUsersFamily);
router.get('/:id', controller.getChild);
router.delete('/:id', controller.deleteChild);
router.post('/', controller.createChild);
export default router;
