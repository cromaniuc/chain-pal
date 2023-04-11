import { convert, convertUnitWei, convertUnitGwei, convertUnitEther } from '../src/convert';

describe('convert', () => {
    it('should convert a number to hex', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convert({ value: 42 });

        expect(mockLog).toHaveBeenCalledWith('toHexValue: 0x2a');
        mockLog.mockRestore();
    });

    it('should convert a hex string to number', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convert({ value: '0x2a' });

        expect(mockLog).toHaveBeenCalledWith('hexToNumber: 42');
        mockLog.mockRestore();
    });

    it('should print unsupported for invalid input', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convert({ value: 'invalid' });

        expect(mockLog).toHaveBeenCalledWith('Unsupported!');
        mockLog.mockRestore();
    });
});

describe('convertUnitWei', () => {
    it('should convert wei to gwei and ether', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convertUnitWei({ value: '1000000000', decimals: 18 });

        expect(mockLog).toHaveBeenNthCalledWith(1, 'Value in Gwei: 1.0');
        expect(mockLog).toHaveBeenNthCalledWith(2, 'Value in Ether: 0.000000001');
        mockLog.mockRestore();
    });
});

describe('convertUnitGwei', () => {
    it('should convert gwei to wei and ether', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convertUnitGwei({ value: '1', decimals: 18 });

        expect(mockLog).toHaveBeenNthCalledWith(1, 'Value in Wei: 1000000000');
        expect(mockLog).toHaveBeenNthCalledWith(2, 'Value in Ether: 0.000000001');
        mockLog.mockRestore();
    });
});

describe('convertUnitEther', () => {
    it('should convert ether to wei and gwei', async () => {
        const mockLog = jest.spyOn(console, 'log').mockImplementation();
        await convertUnitEther({ value: '0.000000001', decimals: 18 });

        expect(mockLog).toHaveBeenNthCalledWith(1, 'Value in Wei: 1000000000');
        expect(mockLog).toHaveBeenNthCalledWith(2, 'Value in Gwei: 1.0');
        mockLog.mockRestore();
    });
});
