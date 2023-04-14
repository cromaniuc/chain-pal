import { ethers } from 'ethers';

export function encodeSignature(args: any) {
  const result = ethers.utils.id(args.signature);

  console.log(`Encoded signature: ${result.slice(0, 10)}`);
}
