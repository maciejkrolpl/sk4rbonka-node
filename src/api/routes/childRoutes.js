import express from 'express';
import * as controller from './../controllers/childController.js';
import { checkIsAuthorized } from '../../auth/auth.js';

const router = express.Router();

router.get('/:id', checkIsAuthorized(['admin']), controller.getChild);
router.get('/', checkIsAuthorized(['admin']), controller.getChildren);
router.post('/', checkIsAuthorized(['admin']), controller.createChild);

router.get('/family/all/', controller.getChildrenByUsersFamily);
router.get('/family/:id', controller.getChildFromFamily);
router.post('/family/', controller.createChildInFamily)
router.delete('/:id', controller.deleteChild);
export default router;
