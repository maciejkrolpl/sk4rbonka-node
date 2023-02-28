import * as dao from './../models/childDAO.js';
import createNanoID from './../utils/nanoId.js';

export const queryAllChildren = async () => {
  return dao.queryAllChildren();
}

export const queryChildById = async childId => {
  return dao.queryChildById(childId);
}

export const insertChild = async child => {
  const { name } = child;
  const childId = createNanoID();
  return dao.createChild(childId, name);
}