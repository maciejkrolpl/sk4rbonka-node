import Validator from "validatorjs";
import * as rules from './../config/validatorRules.js';


export const isValidTransfer = transfer => {
  const validation = new Validator(transfer, rules.transferRule);
  if (validation.fails()) {
    throw validation.errors.errors;
  }
  return true; 
}

export const isValidParent = parent => {
  const validation = new Validator(parent, rules.parentRule);
  if (validation.fails()) {
    throw validation.errors.errors;
  }
  return true;
}