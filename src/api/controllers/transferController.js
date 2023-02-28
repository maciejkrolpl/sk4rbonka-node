import * as service from './../../services/transferService.js';

export const getTransfers = async (req, res) => {
  try {
    const rows = await service.queryAllTransfers()
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ success: false, error })
  }

}
export const getTransfersByChild = async (req,res) => {
  const childId = req.params.id;
  console.log('childId', childId)
  
  try {
    const rows = await service.queryTransfersByChild(childId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
export const createPocketMoneyTransfer = async(req, res) => {
  const transfer = {
    ...req.body,
    type: 'Pocketmoney'
  };

  try {
    const rows = await service.createTransfer(transfer);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({success:false, error, message: error.message})
  }
  

}