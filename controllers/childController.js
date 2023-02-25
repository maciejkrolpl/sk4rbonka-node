import { queryAllChildren, queryChildById, insertChild } from "../services/childService.js";
import logger from './../logger.js';

export const getChildren = async (req, res) => {
  try {
    const rows = await queryAllChildren();
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: { ...error, message: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
}

export const getChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const row = await queryChildById(childId);
    res.status(200).json(row);
  } catch (error) {
    const errorPayload = { success: false, error: { ...error, message: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }

}

export const createChild = async (req, res) => {
  const child = req.body;
  try {
    const row = await insertChild(child);
    res.status(200).json(row);
  } catch (error) {
    const errorPayload = { success: false, error: { ...error, message: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
}