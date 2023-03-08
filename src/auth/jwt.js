import jwt from 'jsonwebtoken';

export const setCookies = (res, user) => {
    const jwtSecret = process.env.AUTH_SECRET_STRING;


    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(user, jwtSecret, { expiresIn: maxAge });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    })
    
};
