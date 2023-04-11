import { checkAddress, verifyAddress } from '../src/address';
import { ethers } from 'ethers';

describe('checkAddress', () => {
  it('should check if the address is a contract address', async () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation();
    ethers.providers.StaticJsonRpcProvider.prototype.getCode = jest
        .fn()
        .mockResolvedValue('0x606060');

    await checkAddress({
      httpEndpoint: 'http://localhost:8545',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    });

    expect(mockLog).toHaveBeenCalledWith(true);
    mockLog.mockRestore();
  });

  it('should check if the address is not a contract address', async () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation();
    ethers.providers.StaticJsonRpcProvider.prototype.getCode = jest
        .fn()
        .mockResolvedValue('0x');

    await checkAddress({
      httpEndpoint: 'http://localhost:8545',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    });

    expect(mockLog).toHaveBeenCalledWith(false);
    mockLog.mockRestore();
  });
});

describe('verifyAddress', () => {
  it('should verify the address is valid', async () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation();
    await verifyAddress({
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    });

    expect(mockLog).toHaveBeenCalledWith('The address is valid.');
    mockLog.mockRestore();
  });

  it('should verify the address is not valid', async () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation();
    await verifyAddress({
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44',
    });

    expect(mockLog).toHaveBeenCalledWith('The address is not valid.');
    mockLog.mockRestore();
  });
});
