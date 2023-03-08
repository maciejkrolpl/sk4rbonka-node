import * as service from '../services/userService.js';
import throwError from '../utils/errors.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res, next) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        res.status(400).json({
            message: 'Username or Password not present',
        });
    }

    let user;

    const pHash = password;

    try {
        user = await service.queryUserByNameAndPasswordHash(username, pHash);
        res.status(200).json({
            message: 'Login successful',
            user,
        });
    } catch (error) {
        throwError(res, error);
    }
};

export const register = async (req, res, next) => {
    const { password, ...userData } = req.body || {};
    if (!password || password.length < 6) {
        res.status(400).json({ message: 'Password less than 6 characters' });
    }

    let createdUser;
    const pHash = `***${password}***`;
    try {
        createdUser = await service.insertUser({ ...userData, pHash });
        res.status(200).json({
            message: 'User successfully created',
            createdUser,
        });
    } catch (error) {
        throwError(res, error);
    }
};
