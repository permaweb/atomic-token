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

globalThis.SmartWeave = {
  transaction: {
    id: 'utqalrlppwmohjsbnzsptudhwacrtvxkvuhaopboioo'
  }
}

test('allow should create a claimable record', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({
    name: 'Token',
    ticker: 'Token',
    balances: { 'qgdmaozpkycnvisvjfcbglxfvovejncdrvjgctzbhvs': 200 },
    claimable: []
  }, { caller: 'qgdmaozpkycnvisvjfcbglxfvovejncdrvjgctzbhvs', input: { function: 'allow', target: 'sbqtsdcngxppybtjrlxmpgjoqpymyeddwfcyrmyvfue', qty: 100 } })

  
  assert.equal(result.state.claimable[0].qty, 100)
  assert.ok(true)
})

test.run()