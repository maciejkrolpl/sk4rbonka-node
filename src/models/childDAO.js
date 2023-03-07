import client from "./../config/db.js";
import logger from "./../utils/logger.js";

export const queryAllChildren = async () => {
  const query = "SELECT child_id, name, balance FROM children";
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const queryChildById = async (childId) => {
  const query = {
    text: "SELECT child_id, name, balance FROM children WHERE child_id = $1",
    values: [childId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const createChild = async ({ childId, name }) => {
  const query = {
    text: "INSERT INTO children(child_id, name, balance) VALUES($1, $2, $3) returning child_id",
    values: [childId, name, 0],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const isChildExistsById = async (childId) => {
  const query = {
    text: "SELECT EXISTS(SELECT 1 FROM children WHERE child_id = $1)",
    values: [childId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const updateChild = async (child, childId) => {
  const fieldsToUpd = Object.keys(child);
  const valuesToUpd = Object.values(child);
  const queryPart = fieldsToUpd.map((field, i) => `${field} = $${i + 1}`)
    .join`, `;
  const text = `UPDATE CHILDREN SET ${queryPart} WHERE child_id = $${
    fieldsToUpd.length + 1
  }`;
  const values = [...valuesToUpd, childId];
  const query = { text, values };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const deleteChild = async(childId) => {
  const text = 'DELETE FROM children WHERE child_id = $1';
  const values = [childId];
  const query = {text, values};
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rowCount } = result;
  return rowCount;
}