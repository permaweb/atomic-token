import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('check claim function', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({
    balances: {},
    claimable: [
      { to: '<tom>', qty: 100, txID: '<tx>' }
    ]
  }, { caller: '<tom>', input: { function: 'claim', qty: 100, txID: '<tx>' } })

  assert.equal(result.state.balances['<tom>'], 100)
  assert.ok(true)
})

test.run()