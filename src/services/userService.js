import * as dao from './../models/userDAO.js';
import createNanoID from '../utils/nanoId.js';
import { validateUser } from '../utils/validatorHelper.js';

export const queryUserByName = async (userName) => {
    const users = await dao.queryUserByName(userName);


    return users;
};

export const insertUser = async (user) => {
    const userId = createNanoID();
    const role = 'user';

    const userWithId = {
        ...user,
        userId,
        role
    };

    validateUser(userWithId);
    return (await dao.insertUser(userWithId))[0];
};
