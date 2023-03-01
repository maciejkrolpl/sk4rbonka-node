import * as service from "./../../services/childService.js";
import logger from "../../utils/logger.js";

export const getChildren = async (req, res) => {
  try {
    const rows = await service.queryAllChildren();
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
    const row = await service.queryChildById(childId);
    if (!row) {
      res.sendStatus(404)
    } else {
      res.status(200).json(row);
    }

  } catch (error) {
    const errorPayload = { success: false, error: { ...error, message: error.message } }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }

}

export const createChild = async (req, res) => {
  const child = req.body;
  try {
    const row = await service.insertChild(child);
    if (!row) {
      res.sendStatus(400);
    } else {
      res.status(200).json(row);
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}