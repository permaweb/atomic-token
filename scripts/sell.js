import { OrderBook } from 'permaweb-orderbook'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./eyeblob.json', 'utf-8'))

async function main() {
  const orderbook = await OrderBook.init({
    currency: 'U',
    wallet: jwk
  })

  const result = await orderbook.sell({
    assetId: 'C3ZEyjoBkda7DRUiGO67XSmdsQtJCTHkU5I45WEb2oU',
    qty: 100,
    price: (.01 * 1e6) / 100
  })
  console.log(result)
}

main()