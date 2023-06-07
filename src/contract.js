import { constructor } from './write/constructor.js'
import { balance } from './read/balance.js'
import { allow } from './write/allow.js'
import { claim } from './write/claim.js'
import { transfer } from './write/transfer.js'

export async function handle(state, action) {
  switch (action.input?.function) {
    case "__init":
      return constructor(state, action)
    case "balance":
      return balance(state, action).extract()
    case "transfer":
      return transfer(state, action).fold(handleError, identity)
    case "allow":
      return allow(state, action).fold(handleError, identity)
    case "claim":
      return claim(state, action).fold(handleError, identity)
    default:
      throw new ContractError("Function not found")
  }
}

function identity(v) {
  return v
}

function handleError(msg) {
  throw new ContractError(msg)
}

