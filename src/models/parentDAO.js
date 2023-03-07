import client from "./../config/db.js";
import logger from "./../utils/logger.js";

const FIELDS = ["parent_id", 'family_id', 'name'].join`, `;

export const queryAllParents = async () => {
  const query = `SELECT ${FIELDS} FROM parents`;
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const queryParentById = async (parentId) => {
  const query = {
    text: `SELECT ${FIELDS} FROM parents WHERE parent_id = $1`,
    values: [parentId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const createParent = async ({ parentId, familyId, name }) => {
  const query = {
    text: `INSERT INTO parents(${FIELDS})
      VALUES($1, $2, $3)
      RETURNING parent_id`,
    values: [parentId, familyId, name],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const deleteParent = async(parentId) => {
  const text = 'DELETE FROM parents WHERE parent_id = $1';
  const values = [parentId];
  const query = {text, values};
  logger.info("Executing query", { query });
  const result = await client.query(query);
  logger.info(result);
  const { rowCount } = result;
  return rowCount;
}