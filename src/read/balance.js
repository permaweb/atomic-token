import { of, Left, Right } from '../lib/either.js'

export const balance = (state, action) => of({ state, action })
  .chain(validate)
  .map(readBalance);

function validate({ state, action }) {
  if (!action.input.target) {
    action.input.target = action.caller;
  }
  if (action.caller.length !== 43) {
    return Left("Caller is not valid");
  }
  return Right({ state, action });
}

function readBalance({ state, action }) {
  return {
    result: {
      target: action.input.target,
      balance: state.balances[action.input.target] || 0,
    }
  }
}