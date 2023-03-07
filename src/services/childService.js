import * as dao from "./../models/childDAO.js";
import createNanoID from "./../utils/nanoId.js";

export const queryAllChildren = async () => {
  return await dao.queryAllChildren();
};

export const queryChildById = async (childId) => {
  return (await dao.queryChildById(childId))[0];
};

export const isChildExistsById = async (childId) => {
  const rows = await dao.isChildExistsById(childId);
  return rows[0]?.exists;
};

export const insertChild = async (child) => {
  const { name } = child;
  const childId = createNanoID();
  return (await dao.createChild({ childId, name }))[0];
};

export const updateChild = async (child, childId) => {
  return (await dao.updateChild(child, childId))[0];
};

export const deleteChild = async (childId) => {
  const rowCount = await dao.deleteChild(childId);
  if (!rowCount) {
    throw { message: 'Error deleting child.' }
  }
  return {
    success: true
  }
}
