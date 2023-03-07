import * as dao from './../models/familyDAO.js';
import createNanoID from './../utils/nanoId.js';

export const queryAllFamilies = async () => {
    return await dao.queryAllFamilies();
};

export const queryFamilyById = async (familyId) => {
    return (await dao.queryFamilyById(familyId))[0];
};

export const isFamilyExistsById = async (familyId) => {
    const rows = await dao.isFamilyExistsById(familyId);
    return rows[0]?.exists;
};

export const insertFamily = async (family) => {
    const { name } = family;
    const familyId = createNanoID();
    return (await dao.createFamily({ familyId, name }))[0];
};

// export const updateFamily = async (family, familyId) => {
//   return (await dao.updateFamily(family, familyId))[0];
// };

export const deleteFamily = async (familyId) => {
    const rowCount = await dao.deleteFamily(familyId);
    if (!rowCount) {
        throw { message: 'Error deleting family.' };
    }
    return {
        success: true,
    };
};
