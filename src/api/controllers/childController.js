import * as service from './../../services/childService.js';
import throwError from './../../utils/errors.js';

export const getChildren = async (req, res) => {
    try {
        const rows = await service.queryAllChildren();
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getChild = async (req, res) => {
    const childId = req.params.id;

    try {
        const row = await service.queryChildById(childId);
        if (!row) {
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
