import { OrderBook } from 'permaweb-orderbook'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
//const asset = 'TXXAacFefU3DUcoL7VPtmciCvkmEsKY5nPJTgO56RD4'
const asset = 'cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8'

async function main() {
  const orderbook = await OrderBook.init({
    currency: 'U',
    wallet: jwk
  })

  const result = await orderbook.buy({
    assetId: asset,
    qty: .01 * 1e6, // price as buyer you want spend (total price of purchase)
  })
  console.log(result)
}

main()