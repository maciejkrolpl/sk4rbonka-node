import logger from "./logger.js";

const throwError = (res, error) => {
  let result = { ...error, success: false };

  if ("message" in error) {
    result = { ...result, description: error.message };
  } else {
    result = { description: Object.values(error).flat() };
  }

  res.status(400).json(result);
  logger.error(result);
};

export default throwError;
