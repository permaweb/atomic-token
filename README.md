# Atomic Token Contract

The Atomic Token Contract is designed as a contract for tradeable tokens that can be deployed alongside any digital asset. This contract incorporates both the SmartWeave Token (PST) Spec and the Foreign Call Protocol 2.0 (FCP2) Spec, enabling seamless integration and enhanced functionality.

- PST - https://g8way.io/SXsVG4CdS_AbQrsoBaRri6xsvNVy060ZxQ32ZcmpULM
- FCP2 - https://specs.g8way.io/?tx=iXHbTuV7kUR6hQGwNjdnYFxxp5HBIG1b3YI2yy7ws_M

## Goal

The goal of this contract is to create a permanent atomic token contract that is complete and flexible for both the NFT use case and the Token use case. This contract contains a constructor that will default the `name`, `ticker`, and `balances` properties if the creator chooses not to define those properties.

## Contract Source TX

You can use this source tx to deploy your atomic assets.

```
xi6IPpC-uqMYrU5xcgGYNxku2g-vnRwk9TnyzbjaHSY
```

## Example (Dispatch and Warp)

In this example, the application is using the browser, with the `dispatch` function and the warp `register` function. This example is great for assets under 100kb.

```js
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { WarpFactory } from "warp-contracts";
import Arweave from "arweave";

const arweave = Arweave.init({});
const warp = WarpFactory.forMainnet().use(new DeployPlugin());

export async function create(data, tags) {
  const tx = arweave.createTransaction(data);
  tags.forEach((t) => {
    tx.addTag(t.name, t.value);
  });
  // Publish as Atomic Token, using defaults
  tx.addTag("App-Name", "SmartWeaveContract");
  tx.addTag("App-Version", "0.3.0");
  tx.addTag("Contract-Src", "xi6IPpC-uqMYrU5xcgGYNxku2g-vnRwk9TnyzbjaHSY");
  tx.addTag("Init-State", JSON.stringify({}));

  const result = await arweaveWallet.dispatch(tx);
  await warp.register(tx.id, "node2");
  return result;
}
```

You will notice that the state is blank, this is because the constructor will default the core props of the contract. It will set the signer as the owner with a balance of one, and default the name and ticker properties.

```json
{
  "name": "Atomic Asset",
  "ticker": "AA",
  "balances": {
    "[action.caller]": 100
  },
  "claimable": []
}
```

If you would like to override these defaults, just send your initial state object as the state.

For more examples, check out the Permaweb Cookbook - https://cookbook.g8way.io

## IMPORTANT

To successfully read this contract, you need to make sure that `useConstructor` is set to true.

```js
import { WarpFactory } from "warp-contracts";

const warp = WarpFactory.forMainnet();

async function main() {
  const result = await warp
    .contract(process.argv[2])
    .setEvaluationOptions({
      allowBigInt: true,
      internalWrites: true,
      unsafeClient: "skip",
      useConstructor: true,
    })
    .readState();

  console.log(result.cachedValue.state);
}

main();
```
