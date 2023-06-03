export function constructor(state, action) {
  if (action.input.args) {
    state = action.input.args
  }

  if (!state.claimable) {
    state.claimable = []
  }

  if (!state.balances) {
    state.balances = {}
  }

  if (!action.input?.args?.balances) {
    state.balances[action.caller] = 100
  }

  state.name = action.input?.args?.name ? action.input.args.name : 'AtomicAsset'
  state.ticker = action.input?.args?.ticker ? action.input.args.ticker : 'AA'

  return { state }

}