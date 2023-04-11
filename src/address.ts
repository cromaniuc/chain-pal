import { ethers } from 'ethers';

export async function checkAddress(args: any): Promise<void> {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    args.httpEndpoint,
  );
  const address = args.address;

  async function isContractAddress(address: string): Promise<boolean> {
    const code = await provider.getCode(address);
    // If the code at the address is not empty, it's a contract address
    return code.length > 2;
  }

  const isContract = await isContractAddress(address);
  console.log('contract address? ' + isContract);
}

export async function verifyAddress(args: any): Promise<void> {
  if (ethers.utils.isAddress(args.address)) {
    console.log('is valid');
  } else {
    console.log('invalid');
  }
}
