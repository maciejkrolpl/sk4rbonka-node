import * as dao from './../models/transferDAO.js';
import createNanoID from './../utils/nanoId.js';
import { validateTransfer } from '../utils/validatorHelper.js';
import { isChildExistsById } from './../services/childService.js';

export const queryAllTransfers = async () => {
  return dao.queryAllTransfers();
}

export const queryTransfersByChild = async childId => {
  return dao.queryTransfersByChild(childId);
}

export const sumTransfersAmountByChild = async(childId) => {
  return (await dao.sumTransfersAmountByChild(childId))[0];
}

export const createTransfer = async transfer => {
  const transferWithId = {
    ...transfer,
    transferId: createNanoID()
  }

  const isChildExists = await isChildExistsById(transfer.childId);
  if (!isChildExists) {
    throw { description: 'Invalid child Id!' };
  }

  validateTransfer(transferWithId);
  const result = (await dao.createTransfer(transferWithId))[0];
  console.log('resuklt **** ' , result)
  return result;
}
