import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()

async function main() {
  const result = await warp.contract(process.argv[2])
    .setEvaluationOptions({
      allowBigInt: true,
      internalWrites: true,
      unsafeClient: 'skip',
      useConstructor: true
    })
    .readState()

  console.log(result.cachedValue.state)
}

main()