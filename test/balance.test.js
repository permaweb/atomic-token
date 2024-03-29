import { test } from 'uvu'
import * as assert from 'uvu/assert'

globalThis.ContractError = function (msg) {
  return new Error(msg)
}

globalThis.ContractAssert = function (expr, msg) {
  if (!expr) {
    throw new Error(msg)
  }
}

const TOM = 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI'
const JUSTIN = '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4'
const state = {
  balances: {
    [TOM]: 100,
    [JUSTIN]: 10000000
  },
  name: 'Token',
  ticker: 'Token',
  claimable: []
}

test('Get Atomic Token Balance from caller', async () => {
  const { handle } = await import('../src/contract.js')
  const { result } = await handle(state, {
    caller: TOM, input: {
      function: 'balance'
    }
  })

  assert.equal(result.balance, 100)
})

test('Get Atomic Token Balance from target', async () => {
  const { handle } = await import('../src/contract.js')
  const { result } = await handle(state, {
    caller: TOM, input: {
      function: 'balance',
      target: JUSTIN
    }
  })
  assert.equal(result.balance, 10000000)
})

test.run()