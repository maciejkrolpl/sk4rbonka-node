import jwt from 'jsonwebtoken';
const jwtSecret = process.env.AUTH_SECRET_STRING;

export const setCookies = (res, user) => {
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(user, jwtSecret, { expiresIn: maxAge });
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
    });
};

export const isVerifiedToken = (cookies, roles = []) => {
    const token = cookies?.jwt;

    if (!token) {
        return { error: 'Not authorized, token not available' };
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (!roles.includes(decoded.role) && roles.length) {
            return { error: 'Not authorized' };
        }
    } catch (error) {
        return { error };
    }

    return '';
};

export const getLoggedUser = (cookies) => {
    const token = cookies?.jwt;

    if (!token) {
        return {
            error: 'Not authorized, token not available!',
            isSuccess: false,
        };
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        return { user: decoded, isSuccess: true };
    } catch (error) {
        return { error, isSuccess: false };
    }
};

export const getLoggedUserFamilyId = (cookies) => {
    const loggedUser = getLoggedUser(cookies);
    const {
        user: { family_id },
    } = loggedUser;
    return family_id;
};

export const getLoggedUserId = (cookies) => {
    const loggedUser = getLoggedUser(cookies);
    const {
        user: { user_id },
    } = loggedUser;
    return user_id;
};
