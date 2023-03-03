import client from './../config/db.js';
import logger from './../utils/logger.js';

const FIELDS = [
  'transfer_id',
  'cumulation_id',
  'child_id',
  'description',
  'parent_id',
  'type',
  'amount',
  'transfer_date'
].join`, `;

export const queryAllTransfers = async () => {
  const query = `SELECT ${FIELDS} FROM transfers`;
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const queryTransfersByChild = async childId => {
  const query = {
    text: `SELECT ${FIELDS} FROM transfers WHERE child = $1`,
    values: [childId]
  }
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const sumTransfersAmountByChild = async (childId) => {
  const addTypes = ['Savings', 'Other', 'Cumulation'];
  const subtractTypes = ['Withdraw', 'Deduction'];
  const values = [addTypes, subtractTypes, childId];
  const text = 'SELECT plus.plusval - minus.minusval AS balance FROM '
    + '(SELECT COALESCE(SUM(AMOUNT),0) AS plusval FROM transfers WHERE type = ANY($1) AND child_id = $3) AS plus, '
    + '(SELECT COALESCE(SUM(AMOUNT),0) AS minusval FROM transfers WHERE type = ANY($2) AND child_id = $3) AS minus';
  const query = { text, values };
  logger.info('Executing query', { query });
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
    text: `INSERT INTO transfers(transfer_id, child_id, parent_id, cumulation_id, type, amount, description)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING transfer_id`,
    values: [transferId, childId, parentId, cumulationId, type, amount, description]
  };
  logger.info('Executing query', { query });
  const result = await client.query(query);
  const { rows } = result;
  console.log('rows ******  ', rows)
  return rows;
}