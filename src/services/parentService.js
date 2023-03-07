import * as dao from "./../models/parentDAO.js";
import createNanoID from "../utils/nanoId.js";
import { validateParent } from "../utils/validatorHelper.js";

export const queryAllParents = async () => {
  return await dao.queryAllParents();
};

export const queryParentById = async (parentId) => {
  return (await dao.queryParentById(parentId))[0];
};

export const isParentExistsById = async (parentId) => {
  const rows = await dao.isParentExistsById(parentId);
  return rows[0]?.exists;
};

export const createParent = async (parent) => {
  const parentWithId = {
    ...parent,
    parentId: createNanoID(),
  };

  validateParent(parentWithId);
  return (await dao.createParent(parentWithId))[0];
};

export const deleteParent = async (parentId) => {
  const rowCount = await dao.deleteParent(parentId);
  if (!rowCount) {
    throw {message: 'Error deleting parent.'}
  }
  return {
    success: true
  }
}