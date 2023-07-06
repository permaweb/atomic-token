import { fromNullable, Left, Right } from '../lib/either.js'

export function reject(state, action) {
  return fromNullable({state, action})
    .chain(validate)
    .map(update)
}

function update({state, action}) {
  const claim = state.claimable.find(c => c.txID === action.input.tx)
  
  if (!state.balances[claim.from]) {
    state.balances[claim.from] = 0
  }
  // add claim amount back to balance
  state.balances[claim.from] += claim.qty
  
  // remove claim
  state.claimable = state.claimable.filter(c => c.txID !== claim.txID)
  return {state}
}

function validate({state, action}) {
  if (!action.input.tx) {
    return Left('tx is required!')
  }
  if (!action.input.qty) {
    return Left('qty is required!')
  }
  if (action.input.tx.length !== 43) {
    return Left('tx is not valid')
  }
  if (!Number.isInteger(action.input.qty)) {
    return Left('qty must be an integer')
  }
  if (state.claimable.filter((c) => c.txID === action.input.tx).length !== 1) {
    return Left('claim not found')
  }
  if (state.claimable.filter((c) => c.txID === action.input.tx)[0]?.to !== action.caller) {
    return Left('claim in not addressed to caller')
  }

  return Right({state, action})
}