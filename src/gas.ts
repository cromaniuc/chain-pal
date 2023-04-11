import { ethers } from 'ethers';

export async function estimateGasWrapper(args: any) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    args.httpEndpoint,
  );
  await estimateGas(provider, args.from, args.to, args.value);
}

export async function estimateGas(
  provider: ethers.providers.StaticJsonRpcProvider,
  fromAddress: string,
  toAddress: string,
  value: string,
) {
  try {
    const transaction = {
      from: fromAddress,
      to: toAddress,
      value: value,
    };

    const gasLimit = await provider.estimateGas(transaction);
    console.log(gasLimit.toString());
    return gasLimit;
  } catch (error: any) {
    console.error('Error estimating gas:', error.message);
  }
}
