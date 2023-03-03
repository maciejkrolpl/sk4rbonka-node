import Validator from "validatorjs";
import * as rules from './../config/validatorRules.js';


export const validateTransfer = transfer => {
  const validation = new Validator(transfer, rules.transferRule);
  if (validation.fails()) {
    throw validation.errors.errors;
  }
}

export const validateParent = parent => {
  const validation = new Validator(parent, rules.parentRule);
  if (validation.fails()) {
    throw validation.errors.errors;
  }
}