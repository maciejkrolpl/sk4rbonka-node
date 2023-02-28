import client from './../config/db.js';
import logger from './../utils/logger.js';

const FIELDS = [
  'transfer_id',
  'cumulation',
  'child',
  'description',
  'parent',
  'type',
  'amount',
  'transfer_date'
].join`, `;

export const queryAllTransfers = async () => {
  const query = `SELECT ${FIELDS} FROM transfers`;
  logger.info('Executing query', {query});
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const queryTransfersByChild = async childId => {
  const query = {
    text: `SELECT ${FIELDS} FROM transfers WHERE child = $1`,
    values: [childId]
  }
  logger.info('Executing query', {query});
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const createTransfer = async transfer => {
  const {
    transferId,
    childId,
    parentId,
    cumulationId,
    type,
    amount,
    description
  } = transfer;

  const query = {
    text: `INSERT INTO transfers(transfer_id, child, parent, cumulation, type, amount, description)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING transfer_id`,
    values: [transferId, childId, parentId, cumulationId, type, amount, description]
  };
  logger.info('Executing query', {query});
  const result = await client.query(query);
  const { rows } = result;
  return rows;

}