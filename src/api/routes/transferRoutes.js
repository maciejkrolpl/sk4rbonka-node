import express from "express";
import * as controller from "./../controllers/transferController.js";
const router = express.Router();
router.get("/", controller.getTransfers);
router.get("/sum/child/:id", controller.sumTransfersAmountByChild);
router.get("/child/:id", controller.getTransfersByChild);
router.post("/", controller.createTransfer);
// router.post('/cumulation', controller.createCumulationTransfer);
// router.get('/:id', getChild);
// router.post('/', createChild)
export default router;
