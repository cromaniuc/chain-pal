import { ethers } from 'ethers';

export async function convert(args: any): Promise<void> {
  if (!ethers.utils.isHexString(args.value) && !isNaN(Number(args.value))) {
    const toHexValue = ethers.utils.hexValue(ethers.BigNumber.from(args.value));
    console.log('hex value: ' + toHexValue);
  } else if (ethers.utils.isHexString(args.value)) {
    const hexToNumber = ethers.utils.formatUnits(args.value, 0);
    console.log('number value: ' + hexToNumber);
  } else {
    console.log('Unsupported!');
  }
}

export async function convertUnitWei(args: any): Promise<void> {
  const wei = ethers.BigNumber.from(args.value);
  const gwei = ethers.utils.formatUnits(wei, 'gwei');
  const ether = ethers.utils.formatUnits(wei, args.decimals);
  console.log(`gwei: ${gwei}`);
  console.log(`ether: ${ether}`);
}

export async function convertUnitGwei(args: any): Promise<void> {
  const wei = ethers.utils.parseUnits(args.value, 'gwei');
  const ether = ethers.utils.formatUnits(wei, args.decimals);
  console.log(`wei: ${wei.toString()}`);
  console.log(`ether: ${ether}`);
}

export async function convertUnitEther(args: any): Promise<void> {
  const wei = ethers.utils.parseUnits(args.value, args.decimals);
  const gwei = ethers.utils.formatUnits(wei, 'gwei');
  console.log(`wei: ${wei.toString()}`);
  console.log(`gwei: ${gwei}`);
}
