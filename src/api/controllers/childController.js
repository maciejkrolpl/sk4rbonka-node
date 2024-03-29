import * as service from './../../services/childService.js';
import throwError from './../../utils/errors.js';
import { getLoggedUserFamilyId, getLoggedUserId } from '../../auth/jwt.js';

export const getChildren = async (req, res) => {
    try {
        const rows = await service.queryAllChildren();
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getChildrenByUsersFamily = async (req, res) => {
    const userId = getLoggedUserId(req.cookies);
    try {
        const rows = await service.getChildrenByUsersFamily(userId);
        res.status(200).json(rows);
    } catch (error) {
        throwError(res, error);
    }
};

export const getChildFromFamily = async (req, res) => {
    const childId = req.params.id;
    const familyId = getLoggedUserFamilyId(req.cookies);

    try {
        const row = await service.queryChildByIdAndFamilyId(childId, familyId);
        if (!row) {
            res.sendStatus(404);
        } else {
            res.status(200).json(row);
        }
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

export const createChildInFamily = async (req, res) => {
    const child = req.body;
    const familyId = getLoggedUserFamilyId(req.cookies);
    const childWithFamily = {
        ...child,
        familyId,
    };

    try {
        const row = await service.insertChild(childWithFamily);
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

export const deleteChildFromFamily = async (req, res) => {
    const childId = req.params.id;
    const familyId = getLoggedUserFamilyId(req.cookies);

    try {
        const row = await service.deleteChildFromFamily(childId, familyId);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};
export const updateChild = async (req, res) => {
    const childId = req.params.id;
    const child = req.body;

    try {
        const row = await service.updateChild(child, childId);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};

export const updateChildInFamily = async (req, res) => {
    const childId = req.params.id;
    const child = req.body;
    const childFamilyId = (await service.queryChildById(childId)).family_id;
    const userFamilyId = getLoggedUserFamilyId(req.cookies);

    if (childFamilyId !== userFamilyId) {
        return throwError(res, 'Unable to update child.');
    }

    try {
        const row = await service.updateChild(child, childId);
        res.status(200).json(row);
    } catch (error) {
        throwError(res, error);
    }
};
