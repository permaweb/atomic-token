export function validate(state) {
  ContractAssert(state.name, 'Name is required!')
  ContractAssert(state.ticker, 'Ticker is required!')
  ContractAssert(state.balances, 'Balances is required!')
  ContractAssert(state.claimable, 'Claimable is required!')
}