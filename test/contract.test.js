import { test } from 'uvu'
import * as assert from 'uvu/assert'

globalThis.ContractError = function (msg) {
  return new Error(msg)
}
globalThis.SmartWeave = {
  transaction: {
    id: '1234'
  }
}

test('ok', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({ balances: { 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 }, claimable: [] }, {
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI',
    input: { function: 'allow', qty: 1, target: '61vg8n54MGSC9ZHfSVAtQp4WjNb20TaThu6bkQ86pPI' }
  })
  console.log(JSON.stringify(result, null, 2))
  assert.equal(result.state.claimable[0].txID, "1234")
  assert.ok(true)
})

test.run()