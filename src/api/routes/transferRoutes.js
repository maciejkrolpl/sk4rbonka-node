import express from 'express';
import * as controller from './../controllers/transferController.js';
const router = express.Router();
router.get('/', controller.getTransfers);
router.get('/child/:id', controller.getTransfersByChild);
router.post('/pocketmoney', controller.createPocketMoneyTransfer);
// router.get('/:id', getChild);
// router.post('/', createChild)
export default router;