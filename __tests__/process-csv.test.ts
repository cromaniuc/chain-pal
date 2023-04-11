import fs from 'fs';
import { ethers } from 'ethers';
import { processCsv } from '../src/process-csv';

jest.mock('fs');

const mockReadStream = fs.createReadStream as jest.Mock;
const mockCsvData = `amountWei,from,to
1000000000000000000,0x742d35Cc6634C0532925a3b844Bc454e4438f44e,0x742d35Cc6634C0532925a3b844Bc454e4438f44f
`;

describe('processCsv', () => {
    beforeEach(() => {
        mockReadStream.mockImplementation(() => {
            const { Readable } = require('stream');
            const readable = new Readable();
            readable._read = () => {};
            readable.push(mockCsvData);
            readable.push(null);
            return readable;
        });
    });

    it('should print an error if httpEndpoint is not provided', async () => {
        const mockError = jest.spyOn(console, 'error').mockImplementation();
        await processCsv({ csvFilePath: 'test.csv' });

        expect(mockError).toHaveBeenCalledWith('Error: httpEndpoint is required');
        mockError.mockRestore();
    });

    it('should print an error if csvFilePath is not provided', async () => {
        const mockError = jest.spyOn(console, 'error').mockImplementation();
        await processCsv({ httpEndpoint: 'http://localhost:8545' });

        expect(mockError).toHaveBeenCalledWith('Error: csvFilePath is required');
        mockError.mockRestore();
    });

    it('should process a CSV file and log transaction data', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        ethers.providers.StaticJsonRpcProvider.prototype.getGasPrice = jest
            .fn()
            .mockResolvedValue(ethers.BigNumber.from('10000000000'));
        ethers.providers.StaticJsonRpcProvider.prototype.getTransactionCount = jest
            .fn()
            .mockResolvedValue(0);
        ethers.providers.StaticJsonRpcProvider.prototype.getCode = jest
            .fn()
            .mockResolvedValue('0x');

        await processCsv({
            httpEndpoint: 'http://localhost:8545',
            csvFilePath: 'test.csv',
        });

        expect(mockLog).toHaveBeenCalledWith('CSV file successfully processed!');
        mockLog.mockRestore();
    });
});
