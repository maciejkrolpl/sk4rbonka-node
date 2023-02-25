import { queryAllChildren, queryChildById, insertChild } from "../services/childService.js";

export const getChildren = async (req, res) => {
  try {
    const rows = await queryAllChildren();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

export const getChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const row = await queryChildById(childId);
    res.status(200).json(row);
  } catch (error) {
    res.status(400).json({ success: false, error })
  }

}

export const createChild = async (req, res) => {
  const child = req.body;
  try {
    const row = await insertChild(child);
    res.status(200).json(row);
  } catch (error) {
    console.error('error inserting child');
    console.error(error);
    res.status(400).json({ success: false, error })
  }
}