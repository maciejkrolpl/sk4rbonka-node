export const transferRule = {
  transferId: 'required',
  type: 'required|in:Savings,Withdraw,Pocketmoney,Other,Cumulation,Deduction',
  transferDate: 'required|date',
  amount: 'required|numeric',
  cumulationId: 'required_if:type,Cumulation',
  parentId: 'required_if:type,Savings|required_if:type,Withdraw|required_if:type,Pocketmoney|required_if:type,Other|required_if:type,Deduction',
  description: 'required_if:type,Deduction'
}

export const parentRule = {
  parentId: 'required',
  name: 'required'
}