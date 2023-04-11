import { ethers } from 'ethers';

export async function convert(args: any): Promise<void> {
  console.log(`Provided value: ${args.value}`);

  if (!ethers.utils.isHexString(args.value) && !isNaN(Number(args.value))) {
    const toHexValue = ethers.utils.hexValue(ethers.BigNumber.from(args.value));
    console.log('toHexValue: ' + toHexValue);
  } else if (ethers.utils.isHexString(args.value)) {
    const hexToNumber = ethers.utils.formatUnits(args.value, 0);
    console.log('hexToNumber: ' + hexToNumber);
  } else {
    console.log('Unsupported!');
  }
}

export async function convertUnitWei(args: any): Promise<void> {
  const wei = ethers.BigNumber.from(args.value);
  const gwei = ethers.utils.formatUnits(wei, 'gwei');
  const ether = ethers.utils.formatUnits(wei, args.decimals);
  console.log(`Value in Gwei: ${gwei}`);
  console.log(`Value in Ether: ${ether}`);
}

export async function convertUnitGwei(args: any): Promise<void> {
  const wei = ethers.utils.parseUnits(args.value, 'gwei');
  const ether = ethers.utils.formatUnits(wei, args.decimals);
  console.log(`Value in Wei: ${wei.toString()}`);
  console.log(`Value in Ether: ${ether}`);
}

export async function convertUnitEther(args: any): Promise<void> {
  const wei = ethers.utils.parseUnits(args.value, args.decimals);
  const gwei = ethers.utils.formatUnits(wei, 'gwei');
  console.log(`Value in Wei: ${wei.toString()}`);
  console.log(`Value in Gwei: ${gwei}`);
}
