import express from 'express'
import * as controller from './../controllers/transferController.js'
const router = express.Router()
router.get('/', controller.getTransfers)
router.get('/:id', controller.getTransferById)
router.get('/sum/child/:id', controller.sumTransfersAmountByChild)
router.get('/child/:id', controller.getTransfersByChild)
router.post('/', controller.createTransfer)
router.delete('/:id', controller.getTransferById)
export default router
