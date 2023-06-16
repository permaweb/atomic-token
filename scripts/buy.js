import { OrderBook } from 'permaweb-orderbook'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
//const asset = 'TXXAacFefU3DUcoL7VPtmciCvkmEsKY5nPJTgO56RD4'
const asset = 'C3ZEyjoBkda7DRUiGO67XSmdsQtJCTHkU5I45WEb2oU'

async function main() {
  const orderbook = await OrderBook.init({
    currency: 'U',
    wallet: jwk
  })

  const result = await orderbook.buy({
    assetId: asset,
    qty: .01 * 1e6,
  })
  console.log(result)
}

main()