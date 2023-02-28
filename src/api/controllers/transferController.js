import * as service from './../../services/transferService.js';

export const getTransfers = async (req, res) => {
  try {
    const rows = await service.queryAllTransfers()
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: {...error, message: error.message} }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }

}
export const getTransfersByChild = async (req,res) => {
  const childId = req.params.id;
  console.log('childId', childId)
  
  try {
    const rows = await service.queryTransfersByChild(childId);
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: {...error, message: error.message} }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
}
export const createPocketMoneyTransfer = async(req, res) => {
  const transfer = req.body;
  try {
    const rows = await service.createPocketMoneyTransfer(transfer);
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: {...error, message: error.message} }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
  

}