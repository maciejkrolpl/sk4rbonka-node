import * as dao from './../models/transferDAO.js';
import createNanoID from './../utils/nanoId.js';
import { validateTransfer } from '../utils/validatorHelper.js';
import { isChildExistsById, updateChild } from './../services/childService.js';

export const queryAllTransfers = async () => {
  return dao.queryAllTransfers();
}

export const queryTransfersByChild = async childId => {
  return dao.queryTransfersByChild(childId);
}

export const sumTransfersAmountByChild = async (childId) => {
  const isChildExists = await isChildExistsById(childId);
  if (!isChildExists) {
    throw { message: 'Invalid child Id!' };
  }

  return (await dao.sumTransfersAmountByChild(childId))[0];
}

export const createTransfer = async transfer => {
  if (!('transferDate' in transfer)) {
    transfer = {
      ...transfer,
      transferDate: new Date()
    }
  }
  const transferWithId = {
    ...transfer,
    transferId: createNanoID()
  }

  const isChildExists = await isChildExistsById(transfer.childId);
  if (!isChildExists) {
    throw { message: 'Invalid child Id!' };
  }



  validateTransfer(transferWithId);
  const result = (await dao.createTransfer(transferWithId))[0];

  if (transfer.type !== 'Pocketmoney') {

    const childsBalance = (await sumTransfersAmountByChild(transfer.childId)).balance;
    const child = {
      balance: childsBalance
    };

    updateChild(child, transfer.childId);

  }

  return result;
}
