import * as dao from './../models/transferDAO.js';
import createNanoID from './../utils/nanoId.js';
import { areAllFieldsFilled, isValidCumulationTransfer, isValidPocketMoneyTransfer, isValidTransfer } from '../utils/validatorHelper.js';
import { queryChildById } from './childService.js';


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

  if(isValidTransfer(transferWithId)) {
    return dao.createTransfer(transferWithId);
  }
}

export const createPocketMoneyTransfer = async transfer => {
  const pocketMoneyTransfer = {
    ...transfer,
    type: 'Pocketmoney',
    transferId: createNanoID()
  };

  const {
    childId,
  } = pocketMoneyTransfer;

  const child = await queryChildById(childId);
  
  if (!child) {
    throw {message: 'invalid child id'};
  }

  if (isValidPocketMoneyTransfer(pocketMoneyTransfer)) {
    return dao.createTransfer(pocketMoneyTransfer);
  }
}

export const createCumulationTransfer = async transfer => {
  const cumulationTransfer = {
    ...transfer,
    type: 'Cumulation',
    transferId: createNanoID()
  };

  const {
    childId,
    cumulationId,
  } = cumulationTransfer;

  const child = await queryChildById(childId);
  
  if (!child) {
    throw {message: 'invalid child id'};
  }

  if (isValidCumulationTransfer(cumulationTransfer)) {
    return await dao.createTransfer(cumulationTransfer);
  }
}
