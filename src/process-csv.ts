import fs from 'fs';

import { parse } from 'csv-parse';
import { ethers } from 'ethers';

import { estimateGas } from './gas';

export type Transaction = {
  value: string;
  from: string;
  to: string;
};

export async function processCsv(args: any): Promise<void> {
  if (!args.httpEndpoint) {
    console.error('Error: httpEndpoint is required');
    return;
  }

  if (!args.csvFilePath) {
    console.error('Error: csvFilePath is required');
    return;
  }

  const provider = new ethers.providers.StaticJsonRpcProvider(
    args.httpEndpoint,
  );
  const file = args.csvFilePath;

  function loadTransactions(): Promise<Transaction[]> {
    const transactions = new Promise<Transaction[]>((resolve, reject) => {
      const transactionsArray: Transaction[] = [];

      fs.createReadStream(file, 'utf8')
        .pipe(parse({ columns: true }))
        .on('data', async ({ amountWei, from, to }) => {
          const hexValue = ethers.utils.hexValue(
            ethers.BigNumber.from(amountWei),
          );
          transactionsArray.push({
            value: hexValue,
            from: from.toLowerCase(),
            to: to.toLowerCase(),
          });
        })
        .on('end', () => {
          console.log('CSV file successfully processed!');
          resolve(transactionsArray);
        })
        .on('error', (err) => {
          reject(err);
        });
    });

    return transactions;
  }

  async function isContractAddress(address: string) {
    const code = await provider.getCode(address);
    // If the code at the address is not empty, it's a contract address
    return code && code.length > 2;
  }

  async function run() {
    const fromNonceMapping = new Map();

    const chainIdHex = '0x1';
    const gasPrice = await provider.getGasPrice();
    const gasPriceHex = ethers.utils.hexValue(gasPrice.mul(2));

    let txIndex = 1;
    try {
      const txs: Transaction[] = await loadTransactions();

      for (const tx of txs) {
        if (fromNonceMapping.get(tx.from) === undefined) {
          const nonce = await provider.getTransactionCount(tx.from);
          fromNonceMapping.set(tx.from, nonce);
        }

        let gasLimit = '0x5208';
        if ((await isContractAddress(tx.to)) === true) {
          console.log('>>> has contract address');
          const estimatedGas = await estimateGas(
            provider,
            tx.from,
            tx.to,
            tx.value,
          );
          gasLimit = estimatedGas?.toString() ?? '0x5208';

          const number1 = ethers.BigNumber.from(gasLimit);
          gasLimit = ethers.utils.hexValue(number1.mul(1125).div(1000));
        }

        console.log(`Transaction ${txIndex++}\n`);
        console.log(`from = "${tx.from}"`);
        console.log(
          `nonce = "${ethers.utils.hexValue(
            ethers.BigNumber.from(fromNonceMapping.get(tx.from)),
          )}"`,
        );
        fromNonceMapping.set(tx.from, fromNonceMapping.get(tx.from) + 1);
        console.log(`to = "${tx.to}"`);
        console.log(`value = "${tx.value}"`);
        console.log(`gas_price = "${gasPriceHex}"`);
        console.log(`gas_limit = "${gasLimit}"`);
        console.log(`chain_id = "${chainIdHex}"`);
        console.log(`---\n`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  await run();
}
