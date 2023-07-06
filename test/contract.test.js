import { test } from 'uvu'
import * as assert from 'uvu/assert'

globalThis.ContractAssert = function (expr, msg) {
  if (!expr) {
    throw new Error(msg)
  }
}




test('ok', async () => {
  
  globalThis.ContractError = function (msg) {
    return new Error(msg)
  }
  globalThis.SmartWeave = {
    transaction: {
      id: '1234'
    }
  }

  const { handle } = await import('../src/contract.js')
  const result = await handle({
    name: 'Token',
    ticker: 'Token',
    balances: { 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 }, claimable: []
  }, {
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI',
    input: { function: 'allow', qty: 1, target: '61vg8n54MGSC9ZHfSVAtQp4WjNb20TaThu6bkQ86pPI' }
  })

  assert.equal(result.state.claimable[0].txID, "1234")
  assert.ok(true)
})

test.run()