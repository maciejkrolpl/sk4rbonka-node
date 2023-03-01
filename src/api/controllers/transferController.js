import * as service from './../../services/transferService.js';
import logger from '../../utils/logger.js';
import throwError from '../../utils/errors.js';

export const getTransfers = async (req, res) => {
  try {
    const rows = await service.queryAllTransfers()
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: { ...error, description: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }

}
export const getTransfersByChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const rows = await service.queryTransfersByChild(childId);
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: { ...error, description: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
}

export const createTransfer = async (req, res) => {
  const transfer = req.body;
  try {
    const row = await service.createTransfer(transfer);
    res.status(200).json(row);
  } catch (error) {
    throwError(res, error);
  }
}
// export const createPocketMoneyTransfer = async (req, res) => {
//   const transfer = req.body;
//   try {
//     const rows = await service.createPocketMoneyTransfer(transfer);
//     res.status(200).json(rows);
//   } catch (error) {
//     const errorPayload = { success: false, error: { ...error, description: error.message } }
//     res.status(400).json(errorPayload);
//     logger.error(errorPayload);
//   }
// }

// export const createCumulationTransfer = async (req, res) => {
//   const transfer = req.body;
//   try {
//     const row = (await service.createCumulationTransfer(transfer))[0];
//     if (!row) {
//       res.sendStatus(400);
//     } else {
//       res.status(200).json(row);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, error, description: error.message })
//   }
// }