import * as dao from './../models/transferDAO.js'
import createNanoID from './../utils/nanoId.js';

export const queryAllTransfers = async () => {
  return dao.queryAllTransfers();
}

export const queryTransfersByChild = async childId => {
  return dao.queryTransfersByChild(childId);
}

export const createPocketMoneyTransfer = async transfer => {
  const pocketMoneyTransfer = {
    ...transfer,
    type: 'Pocketmoney',
    transferId: createNanoID()
  };

  return dao.createTransfer(pocketMoneyTransfer);

}
