import client from "./../config/db.js";
import logger from "./../utils/logger.js";

export const queryAllFamilies = async () => {
  const query = "SELECT family_id, name FROM families";
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const queryFamilyById = async (familyId) => {
  const query = {
    text: "SELECT family_id, name FROM families WHERE family_id = $1",
    values: [familyId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const createFamily = async ({ familyId, name }) => {
  const query = {
    text: "INSERT INTO families(family_id, name) VALUES($1, $2) returning family_id",
    values: [familyId, name],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

export const isFamilyExistsById = async (familyId) => {
  const query = {
    text: "SELECT EXISTS(SELECT 1 FROM families WHERE family_id = $1)",
    values: [familyId],
  };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rows } = result;
  return rows;
};

// export const updateFamily = async (family, familyId) => {
//   const fieldsToUpd = Object.keys(family);
//   const valuesToUpd = Object.values(family);
//   const queryPart = fieldsToUpd.map((field, i) => `${field} = $${i + 1}`)
//     .join`, `;
//   const text = `UPDATE CHILDREN SET ${queryPart} WHERE family_id = $${
//     fieldsToUpd.length + 1
//   }`;
//   const values = [...valuesToUpd, familyId];
//   const query = { text, values };
//   logger.info("Executing query", { query });
//   const result = await client.query(query);
//   const { rows } = result;
//   return rows;
// };

export const deleteFamily = async (familyId) => {
  const text = 'DELETE FROM families WHERE family_id = $1';
  const values = [familyId];
  const query = { text, values };
  logger.info("Executing query", { query });
  const result = await client.query(query);
  const { rowCount } = result;
  return rowCount;
}