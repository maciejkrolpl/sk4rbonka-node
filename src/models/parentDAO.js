import client from "./../config/db.js";
import logger from "./../utils/logger.js";

const FIELDS = ["parent_id", "name"].join`, `;

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

export const isParentExistsById = async (parentId) => {
  const query = {
    text: "SELECT EXISTS(SELECT 1 FROM parents WHERE parent_id = $1)",
    values: [parentId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const createParent = async ({ parentId, name }) => {
  const query = {
    text: `INSERT INTO parents(parent_id, name)
      VALUES($1, $2)
      RETURNING parent_id`,
    values: [parentId, name],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};
