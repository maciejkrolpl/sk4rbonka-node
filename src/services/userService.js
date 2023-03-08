import * as dao from './../models/userDAO.js';
import createNanoID from '../utils/nanoId.js';
import { validateUser } from '../utils/validatorHelper.js';

export const queryUserByNameAndPasswordHash = async (userName, pHash) => {
    const users = await dao.queryUserByNameAndPasswordHash(userName, pHash);

    if (users.length !== 1) {
        throw {
            message:
                'Error getting user with given name or password is invalid.',
        };
    }

    return users[0];
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
