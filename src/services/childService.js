import * as dao from './../models/childDAO.js';
import createNanoID from './../utils/nanoId.js';
import { isFamilyExistsById } from './familyService.js';
import { validateChild } from '../utils/validatorHelper.js';

export const getChildrenByUsersFamily = async(userId) => {
    return await dao.getChildrenByUsersFamily(userId);
}

export const queryAllChildren = async () => {
    return await dao.queryAllChildren();
};

export const queryChildByIdAndFamilyId = async(childId, familyId) => {
    return (await dao.queryChildByIdAndFamilyId(childId, familyId))[0];
}

export const queryChildById = async (childId) => {
    const child = (await dao.queryChildById(childId))[0];
    return child;
};

export const isChildExistsById = async (childId) => {
    const rows = await dao.isChildExistsById(childId);
    return rows[0]?.exists;
};

export const insertChild = async (child) => {
    const childId = createNanoID();

    const isFamilyExists = await isFamilyExistsById(child.familyId);
    if (!isFamilyExists) {
        throw 'Invalid family Id!';
    }

    const childWithId = {
        ...child,
        childId,
    };

    validateChild(childWithId);
    return (await dao.createChild(childWithId))[0];
};

export const updateChild = async (child, childId) => {
    return (await dao.updateChild(child, childId))[0];
};

export const deleteChild = async (childId) => {
    const rowCount = await dao.deleteChild(childId);
    if (!rowCount) {
        throw { message: 'Error deleting child.' };
    }
    return {
        success: true,
    };
};
