// upload atomic asset using bundlr
import Bundlr from '@bundlr-network/client'
import { WarpFactory } from 'warp-contracts'
import { DeployPlugin } from 'warp-contracts-plugin-deploy'
import fs from 'fs'

const eyeblobNumber = 41
const eyeblob = fs.readFileSync(`./eye-blob-${eyeblobNumber}.png`)
const jwk = JSON.parse(fs.readFileSync('./wallet.json'))

async function main() {
  const bundlr = new Bundlr('https://node2.bundlr.network', "arweave", jwk)
  const tags = [
    { name: 'Content-Type', value: 'image/png' },
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Contract-Src', value: 'DAzJJphpcjv6im1hUgFNGVP91eG9tayhX6NgMsoOHBQ' },
    {
      name: 'Init-State', value: JSON.stringify({
        name: 'eye-blob',
        number: String(eyeblobNumber),
        balances: {
          'YWECbIrjlJpc7ZhwTQCGjPAQyP4CgE_3YIDd8I0wgJ0': 100
        },
        claimable: []
      })
    },
    { name: 'Contract-Manifest', value: JSON.stringify({ "evaluationOptions": { "sourceType": "redstone-sequencer", "allowBigInt": true, "internalWrites": true, "unsafeClient": "skip", "useConstructor": true } }) },
    { name: 'Title', value: 'Eye Blob #' + eyeblobNumber },
    { name: 'Description', value: 'Eye Blob Collection' },
    { name: 'Topic:eye-blob', value: 'eye-blob' },
    { name: 'Type', value: 'image' }

  ]
  const result = await bundlr.upload(eyeblob, { tags })
  console.log(result)
  const warp = WarpFactory.forMainnet().use(new DeployPlugin())
  await warp.register(result.id, 'node2')

}

main()