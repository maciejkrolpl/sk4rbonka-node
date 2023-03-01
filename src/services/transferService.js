import * as dao from './../models/transferDAO.js';
import createNanoID from './../utils/nanoId.js';
import { isValidTransfer } from '../utils/validatorHelper.js';
import { isChildExistsById } from './../services/childService.js';

export const queryAllTransfers = async () => {
  return dao.queryAllTransfers();
}

export const queryTransfersByChild = async childId => {
  return dao.queryTransfersByChild(childId);
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

  if (isValidTransfer(transferWithId)) {
    return (await dao.createTransfer(transferWithId))[0];
  }
}
