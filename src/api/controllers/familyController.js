import * as service from "./../../services/familyService.js";
import throwError from "./../../utils/errors.js";

export const getFamilies = async (req, res) => {
  try {
    const rows = await service.queryAllFamilies();
    res.status(200).json(rows);
  } catch (error) {
    throwError(res, error);
  }
};

export const getFamilyById = async (req, res) => {
  const familyId = req.params.id;

  try {
    const row = await service.queryFamilyById(familyId);
    if (!row) {
      res.sendStatus(404);
    } else {
      res.status(200).json(row);
    }
  } catch (error) {
    throwError(res, error);
  }
};

export const createFamily = async (req, res) => {
  const family = req.body;
  try {
    const row = await service.insertFamily(family);
    if (!row) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(row);
    }
  } catch (error) {
    throwError(res, error);
  }
};

export const deleteFamily = async (req, res) => {
  const familyId = req.params.id;
  try {
    const row = await service.deleteFamily(familyId);
    res.status(200).json(row);
  } catch (error) {
    throwError(res, error);
  }
};
