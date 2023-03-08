import logger from './logger.js';
import { isObject } from './utils.js';

const throwError = (res, error) => {
    let message;

    if (isObject(error)) {
        if (error.message) {
            message = error.message;
        } else {
            message = Object.values(error).flat();
        }
    } else {
        message = error;
    }

    let result = { error: message, isSuccess: false };

    logger.error(result);
    res.status(400).json(result);

};

export default throwError;
