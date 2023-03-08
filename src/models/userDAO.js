import client from './../config/db.js';
import logger from './../utils/logger.js';

const FIELDS = [
  'user_id',
  'name',
  'p_hash',
  'role',
  'email'
].join`, `;

export const queryUserByNameAndPasswordHash = async (userName, pHash) => {
  const query = {
      text: `SELECT ${FIELDS} FROM users WHERE name = $1 AND p_hash = $2`,
      values: [userName, pHash],
  };
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const insertUser = async (child) => {
  const { userId, name, pHash, role, eMail } = child;
  const query = {
      text: `INSERT INTO users(${FIELDS}) VALUES($1, $2, $3, $4, $5) returning user_id`,
      values: [userId, name, pHash, role, eMail],
  };
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};