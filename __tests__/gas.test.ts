import {estimateGas, estimateGasWrapper} from '../src/gas';
import {ethers} from 'ethers';

describe('estimateGasWrapper', () => {
    it('should estimate gas for a transaction', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        ethers.providers.StaticJsonRpcProvider.prototype.estimateGas = jest
            .fn()
            .mockResolvedValue(ethers.BigNumber.from('21000'));

        await estimateGasWrapper({
            httpEndpoint: 'http://localhost:8545',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            value: '1000000000000000000',
        });

        expect(mockLog).toHaveBeenCalledWith('21000');
        mockLog.mockRestore();
    });
});

describe('estimateGas', () => {
    it('should estimate gas for a transaction', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        ethers.providers.StaticJsonRpcProvider.prototype.estimateGas = jest
            .fn()
            .mockResolvedValue(ethers.BigNumber.from('21000'));

        const provider = new ethers.providers.StaticJsonRpcProvider(
            'http://localhost:8545',
        );

        await estimateGas(
            provider,
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            '1000000000000000000',
        );

        expect(mockLog).toHaveBeenCalledWith('21000');
        mockLog.mockRestore();
    });

    it('should catch an error when estimating gas', async () => {
        const mockError = jest.spyOn(console, 'error').mockImplementation();
        ethers.providers.StaticJsonRpcProvider.prototype.estimateGas = jest
            .fn()
            .mockRejectedValue(new Error('Error estimating gas'));

        const provider = new ethers.providers.StaticJsonRpcProvider(
            'http://localhost:8545',
        );

        await estimateGas(
            provider,
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            '1000000000000000000',
        );

        expect(mockError).toHaveBeenCalledWith(
            'Error estimating gas:',
            'Error estimating gas',
        );
        mockError.mockRestore();
    });
});
