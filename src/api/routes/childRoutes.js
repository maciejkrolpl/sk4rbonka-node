import express from 'express';
import { checkIsAuthorized } from '../../auth/auth.js';
import * as controller from './../controllers/childController.js';

const router = express.Router();

router.get('/:id', checkIsAuthorized(['admin']), controller.getChild);
router.get('/', checkIsAuthorized(['admin']), controller.getChildren);
router.post('/', checkIsAuthorized(['admin']), controller.createChild);
router.delete('/:id', checkIsAuthorized(['admin']), controller.deleteChild);
router.patch('/:id', checkIsAuthorized(['admin']), controller.updateChild);

router.get('/family/all/', controller.getChildrenByUsersFamily);
router.get('/family/:id', controller.getChildFromFamily);
router.post('/family/', controller.createChildInFamily);
router.delete('/family/:id', controller.deleteChildFromFamily);
router.patch('/family/:id', controller.updateChildInFamily);
export default router;
