import * as service from './../../services/childService.js';
import throwError from './../../utils/errors.js';
import { getLoggedUser } from '../../auth/jwt.js';

export const getChildren = async (req, res) => {
    try {
        const rows = await service.queryAllChildren();
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getChildrenByUsersFamily = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const rows = await service.getChildrenByUsersFamily(userId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getChild = async (req, res) => {
    const childId = req.params.id;
    const {
        user: { family_id },
    } = getLoggedUser(req.cookies);

    try {
        const row = await service.queryChildById(childId);
        if (!row || row.family_id !== family_id) {
            res.sendStatus(404);
        } else {
            res.status(200).json(row);
        }
    } catch (error) {
        throwError(res, error);
    }
};

export const createChild = async (req, res) => {
    const child = req.body;
    try {
        const row = await service.insertChild(child);
        if (!row) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.status(200).json(row);
        }
    } catch (error) {
        throwError(res, error);
    }
};

export const deleteChild = async (req, res) => {
    const childId = req.params.id;
    try {
        const row = await service.deleteChild(childId);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};
