import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('transfer', async () => {
  const { handle } = await import('../src/contract.js')
  const result = await handle({
    balances: {
      'bacjdyljxfrovwffuszkbacwispcaegwgtfrxwuidwe': 200
    }
  }, {
    caller: 'bacjdyljxfrovwffuszkbacwispcaegwgtfrxwuidwe',
    input: {
      function: 'transfer',
      target: 'wszkkrsxsdmiygqdlzhczxdnhxngtqwnhtabkwkhyli',
      qty: 100
    }
  })
  console.log(result)
  assert.equal(result.state.balances['wszkkrsxsdmiygqdlzhczxdnhxngtqwnhtabkwkhyli'], 100)
  assert.equal(result.state.balances['bacjdyljxfrovwffuszkbacwispcaegwgtfrxwuidwe'], 100)
  assert.ok(true)
})

test.run()