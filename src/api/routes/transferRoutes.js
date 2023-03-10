import express from 'express';
import { checkIsAuthorized } from '../../auth/auth.js';
import * as controller from './../controllers/transferController.js';

const router = express.Router();

router.get('/', checkIsAuthorized(['admin']), controller.getTransfers);
router.get('/:id',checkIsAuthorized(['admin']), controller.getTransferById);
router.get('/sum/child/:id', checkIsAuthorized(['admin']), controller.sumTransfersAmountByChild);
router.get('/child/:id', checkIsAuthorized(['admin']), controller.getTransfersByChild);
router.post('/', checkIsAuthorized(['admin']), controller.createTransfer);

router.get('/family/all',  controller.getTransfersInFamily);
router.get('/family/:id', controller.getTransferByIdInFamily);
router.get('/family/sum/child/:id',  controller.sumTransfersAmountByChildInFamily);


// router.delete('/:id', controller.getTransferById);

export default router;
