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
