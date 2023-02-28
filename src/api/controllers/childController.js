import * as service from "./../../services/childService.js";
import logger from "../../utils/logger.js";

export const getChildren = async (req, res) => {
  try {
    const rows = await service.queryAllChildren();
    res.status(200).json(rows);
  } catch (error) {
    const errorPayload = { success: false, error: {...error, message: error.message} }
    res.status(400).json(errorPayload);
    logger.error(errorPayload);
  }
}

export const getChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const rows = await service.queryChildById(childId);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }

}

export const createChild = async (req, res) => {
  const child = req.body;
  try {
    const rows = await service.insertChild(child);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}