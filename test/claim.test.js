import { test } from 'uvu'
import * as assert from 'uvu/assert'

globalThis.ContractAssert = function (expr, msg) {
  if (!expr) {
    throw new Error(msg)
  }
}


test('check claim function', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({
    name: 'Token',
    ticker: 'Token',
    balances: {},
    claimable: [
      { to: '<tom>', qty: 100, txID: '<tx>' }
    ]
  }, { caller: '<tom>', input: { function: 'claim', qty: 100, txID: '<tx>' } })

  assert.equal(result.state.balances['<tom>'], 100)
  assert.ok(true)
})

test.run()