import client from "../config/db.js";
import createNanoID from './../utils/nanoId.js';

const FIELDS = [
  'transfer_id',
  'cumulation',
  'child',
  'description',
  'parent',
  'type',
  'amount',
  'transfer_date'
].join`, `

export const queryAllTransfers = async () => {
  const query = `SELECT ${FIELDS} FROM transfers`;
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const queryTransfersByChild = async childId => {
  const query = {
    text: `SELECT ${FIELDS} FROM transfers WHERE child = $1`,
    values: [childId]
  }
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const createTransfer = async transfer => {
  const {
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
    values: [createNanoID(), childId, parentId, cumulationId, type, amount, description]
  };
  const result = await client.query(query);
  const { rows } = result;
  return rows;

}

// export const insertChild = async child => {
//   const { name } = child;
//   const query = {
//     text: 'INSERT INTO children(child_id, name, balance) VALUES($1, $2, $3) returning child_id',
//     values: [createNanoID(), name, 0]
//   };
//   const result = await client.query(query);
//   const { rows } = result;
//   return rows[0];
// }