import client from './../config/db.js';
import logger from './../utils/logger.js';

const FIELDS = ['child_id', 'family_id', 'name', 'balance'].join`, `;

export const getChildrenByUsersFamily = async (userId) => {
    const text =
        `SELECT ${FIELDS} FROM children ` +
        `WHERE family_id = ` +
        `(SELECT parents.family_id FROM parents INNER JOIN users ` +
        `ON parents.parent_id = users.parent_id ` +
        `WHERE users.user_id = $1)`;
    const values = [userId];
    const query = {text, values};
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
};

export const queryAllChildren = async () => {
    const query = `SELECT ${FIELDS} FROM children`;
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
};

export const queryChildById = async (childId) => {
    const query = {
        text: `SELECT ${FIELDS} FROM children WHERE child_id = $1`,
        values: [childId],
    };
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
};

export const queryChildByIdAndFamilyId = async(childId, familyId) => {
    const query = {
        text: `SELECT ${FIELDS} FROM children WHERE child_id = $1 AND family_id = $2`,
        values: [childId, familyId]
    };
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
}

export const createChild = async (child) => {
    const { childId, familyId, name } = child;
    const query = {
        text: `INSERT INTO children(${FIELDS}) VALUES($1, $2, $3, $4) returning child_id`,
        values: [childId, familyId, name, 0],
    };
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
};

export const isChildExistsById = async (childId) => {
    const query = {
        text: 'SELECT EXISTS(SELECT 1 FROM children WHERE child_id = $1)',
        values: [childId],
    };
    logger.info('Executing query', query);
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
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rows } = result;
    return rows;
};

export const deleteChild = async (childId) => {
    const text = 'DELETE FROM children WHERE child_id = $1';
    const values = [childId];
    const query = { text, values };
    logger.info('Executing query', { query });
    const result = await client.query(query);
    const { rowCount } = result;
    return rowCount;
};
