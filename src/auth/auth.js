import * as service from '../services/userService.js';
import throwError from '../utils/errors.js';
import bcrypt from 'bcryptjs';
import { setCookies } from './jwt.js';
import { isVerifiedToken } from './jwt.js';

export const login = async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        throwError(res, { message: 'Username and password must be entered' });
        return;
    }

    try {
        const users = await service.queryUserByName(username);
        const { p_hash, email, role, user_id } = users[0];
        const isPasswordCorrect = await bcrypt.compare(password, p_hash);
        if (isPasswordCorrect && users.length === 1) {
            setCookies(res, { user_id, name: username, email, role });
            res.status(200).json({
                message: 'Login successful',
                user: {
                    username,
                    role,
                    email,
                },
            });
        } else {
            res.status(400).json({
                message: 'Invalid user name or password',
                isSuccess: false,
            });
        }
    } catch (error) {
        throwError(res, error);
    }
};

export const register = async (req, res) => {
    const { password, ...userData } = req.body || {};
    if (!password || password.length < 6) {
        res.status(400).json({ message: 'Password less than 6 characters' });
    }

    let createdUser;
    const pHash = await bcrypt.hash(password, 10);
    try {
        createdUser = await service.insertUser({ ...userData, pHash });
        setCookies(res, createdUser);
        res.status(200).json({
            message: 'User successfully created',
            createdUser,
        });
    } catch (error) {
        throwError(res, error);
    }
};

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({
        message: 'User successfully logged out',
    });
};

export const checkIsAuthorized = (roles) => {
    return (req, res, next) => {
        const isAdmin = isVerifiedToken(req.cookies, roles);

        if (isAdmin === '') {
            next();
        } else {
            throwError(res, isAdmin.error);
        }
    };
};
