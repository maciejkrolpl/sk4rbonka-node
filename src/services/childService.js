import client from "../config/db.js";
import createNanoID from './../utils/nanoId.js';

export const queryAllChildren = async () => {
  const query = 'SELECT child_id, name, balance FROM children';
  const result = await client.query(query);
  const { rows } = result;
  return rows;
}

export const queryChildById = async childId => {
  const query = {
    text: 'SELECT child_id, name, balance FROM children WHERE child_id = $1',
    values: [childId]
  };
  const result = await client.query(query);
  const { rows } = result;
  if (!rows.length) {
    throw 'Invalid id';
  }
  return rows[0];
}

export const insertChild = async child => {
  const { name } = child;
  const query = {
    text: 'INSERT INTO children(child_id, name, balance) VALUES($1, $2, $3) returning child_id',
    values: [createNanoID(), name, 0]
  };
  const result = await client.query(query);
  const { rows } = result;
  return rows[0];
}