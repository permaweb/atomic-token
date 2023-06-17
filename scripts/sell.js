import { OrderBook } from 'permaweb-orderbook'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./eyeblob.json', 'utf-8'))

async function main() {
  const orderbook = await OrderBook.init({
    currency: 'U',
    wallet: jwk
  })

  const result = await orderbook.sell({
    assetId: 'cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8',
    qty: 100,
    price: (.01 * 1e6) / 100 // unit price
  })
  console.log(result)
}

main()