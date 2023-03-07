import * as service from "./../../services/transferService.js";
import throwError from "../../utils/errors.js";

export const getTransfers = async (req, res) => {
  try {
    const rows = await service.queryAllTransfers();
    res.status(200).json(rows);
  } catch (error) {
    throwError(res, error);
  }
};

export const sumTransfersAmountByChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const rows = await service.sumTransfersAmountByChild(childId);
    res.status(200).json(rows);
  } catch (error) {
    throwError(res, error);
  }
};

export const getTransfersByChild = async (req, res) => {
  const childId = req.params.id;

  try {
    const rows = await service.queryTransfersByChild(childId);
    res.status(200).json(rows);
  } catch (error) {
    throwError(res, error);
  }
};

export const createTransfer = async (req, res) => {
  const transfer = req.body;
  try {
    const row = await service.createTransfer(transfer);
    res.status(200).json(row);
  } catch (error) {
    throwError(res, error);
  }
};
