import * as dao from './../models/transferDAO.js';
import createNanoID from './../utils/nanoId.js';
import { validateTransfer } from '../utils/validatorHelper.js';
import { isChildExistsById, updateChild, queryChildByIdAndFamilyId } from './../services/childService.js';

export const queryAllTransfers = async () => {
    return dao.queryAllTransfers();
};

export const queryTransfersByChild = async (childId) => {
    return dao.queryTransfersByChild(childId);
};

export const getTransfersInFamily = async(userId) => {
    return await dao.queryTransfersByUserId(userId);
}

export const sumTransfersAmountByChild = async (childId) => {
    const isChildExists = await isChildExistsById(childId);
    if (!isChildExists) {
        throw { message: 'Invalid child Id!' };
    }

    return (await dao.sumTransfersAmountByChild(childId))[0];
};
export const sumTransfersAmountByChildInFamily = async (childId, familyId) => {
    const child = await queryChildByIdAndFamilyId(childId, familyId);
    const isChildExists = !!child;
    if (!isChildExists) {
        throw { message: 'Invalid child Id!' };
    }

    return (await dao.sumTransfersAmountByChild(childId))[0];
};

export const createTransfer = async (transfer) => {
    if (!('transferDate' in transfer)) {
        transfer = {
            ...transfer,
            transferDate: new Date(),
        };
    }
    const transferWithId = {
        ...transfer,
        transferId: createNanoID(),
    };

    const isChildExists = await isChildExistsById(transfer.childId);
    if (!isChildExists) {
        throw { message: 'Invalid child Id!' };
    }

    validateTransfer(transferWithId);
    const result = (await dao.createTransfer(transferWithId))[0];

    if (transfer.type !== 'Pocketmoney') {
        const childsBalance = (
            await sumTransfersAmountByChild(transfer.childId)
        ).balance;
        const child = {
            balance: childsBalance,
        };

        updateChild(child, transfer.childId);
    }

    return result;
};

export const isTransferExistsById = async (transferId) => {
    const rows = await dao.isTransferExistsById(transferId);
    return rows[0]?.exists;
};

export const deleteTransfer = async (transferId) => {
    const rowCount = await dao.deleteTransfer(transferId);
    if (!rowCount) {
        throw { message: 'Error deleting transfer.' };
    }

    return {
        success: true,
    };
};

export const queryTransferById = async (transferId) => {
    return (await dao.queryTransferById(transferId))[0];
};
