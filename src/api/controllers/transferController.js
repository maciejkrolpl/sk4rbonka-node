import * as service from './../../services/transferService.js';
import { getLoggedUserId, getLoggedUserFamilyId } from '../../auth/jwt.js';
import throwError from '../../utils/errors.js';

export const getTransfers = async (req, res) => {
    try {
        const rows = await service.queryAllTransfers();
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getTransfersInFamily = async(req,res) => {
    const userId = getLoggedUserId(req.cookies);
    try {
        const rows = await service.getTransfersInFamily(userId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
}

export const sumTransfersAmountByChild = async (req, res) => {
    const childId = req.params.id;

    try {
        const rows = await service.sumTransfersAmountByChild(childId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const sumTransfersAmountByChildInFamily = async (req, res) => {
    const childId = req.params.id;
    const familyId = getLoggedUserFamilyId(req.cookies);

    try {
        const rows = await service.sumTransfersAmountByChildInFamily(childId, familyId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getTransfersByChild = async (req, res) => {
    const childId = req.params.id;

    try {
        const rows = await service.queryTransfersByChild(childId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const createTransfer = async (req, res) => {
    const transfer = req.body;
    try {
        const row = await service.createTransfer(transfer);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};

export const deleteTransfer = async (req, res) => {
    const transferId = req.params.id;
    try {
        const row = await service.deleteTransfer(transferId);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};

export const getTransferById = async (req, res) => {
    const transferId = req.params.id;

    try {
        const row = await service.queryTransferById(transferId);
        if (!row) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.status(200).json(row);
        }
    } catch (error) {
        throwError(res, error);
    }
};

export const getTransferByIdInFamily = async (req, res) => {
    const transferId = req.params.id;

    try {
        const row = await service.queryTransferById(transferId);
        if (!row) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.status(200).json(row);
        }
    } catch (error) {
        throwError(res, error);
    }
};

