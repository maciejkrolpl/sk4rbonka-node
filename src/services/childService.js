import * as dao from './../models/childDAO.js';
import createNanoID from './../utils/nanoId.js';

export const queryAllChildren = async () => {
  return dao.queryAllChildren();
}

export const queryChildById = async childId => {
  return (await dao.queryChildById(childId))[0];
}

export const isChildExistsById = async (childId) => {
  const rows = await dao.isChildExistsById(childId);
  return rows[0]?.exists;
}

export const insertChild = async child => {
  const { name } = child;
  const childId = createNanoID();
  return (await dao.createChild(childId, name))[0];
}