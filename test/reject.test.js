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

test('reject should remove a claimable record', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({
    name: 'Token',
    ticker: 'Token',
    balances: { 'qgdmaozpkycnvisvjfcbglxfvovejncdrvjgctzbhvs': 100 },
    claimable: [
      {
        from: 'qgdmaozpkycnvisvjfcbglxfvovejncdrvjgctzbhvs',
        to: 'sbqtsdcngxppybtjrlxmpgjoqpymyeddwfcyrmyvfue',
        qty: 100,
        txID: 'utqalrlppwmohjsbnzsptudhwacrtvxkvuhaopboioo'
      }
    ]
  }, { caller: 'sbqtsdcngxppybtjrlxmpgjoqpymyeddwfcyrmyvfue', input: { function: 'reject', tx: 'utqalrlppwmohjsbnzsptudhwacrtvxkvuhaopboioo', qty: 100 } })

  assert.equal(result.state.claimable, [])
  assert.equal(result.state.balances['qgdmaozpkycnvisvjfcbglxfvovejncdrvjgctzbhvs'], 200)
  assert.ok(true)
})

test.run()