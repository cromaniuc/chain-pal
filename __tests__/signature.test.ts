import { ethers } from 'ethers';
import { encodeSignature } from '../src/signature';

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

describe('encodeSignature', () => {
  it('should encode a valid function signature', () => {
    const args = { signature: 'approve(address,uint256)' };
    const expectedResult = '0x095ea7b3';

    encodeSignature(args);

    expect(console.log).toHaveBeenCalledWith(`Encoded signature: ${expectedResult}`);
  });
});
