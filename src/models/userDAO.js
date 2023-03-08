import client from './../config/db.js';
import logger from './../utils/logger.js';

const FIELDS = [
  'user_id',
  'name',
  'p_hash',
  'role',
  'email'
].join`, `;

export const queryUserByName = async (userName) => {
  const query = {
      text: `SELECT ${FIELDS} FROM users WHERE name = $1`,
      values: [userName],
  };
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const insertUser = async (child) => {
  const { userId, name, pHash, role, eMail } = child;
  const query = {
      text: `INSERT INTO users(${FIELDS}) VALUES($1, $2, $3, $4, $5) returning user_id, name, email, role`,
      values: [userId, name, pHash, role, eMail],
  };
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};