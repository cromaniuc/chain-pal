# ChainPal

ChainPal is a handy CLI tool for developers working with EVM-like chains. It
provides various utilities for converting units, processing transaction data
from CSV files, and more.

## Installation

To install ChainPal, run the following command:

```bash
npm install -g chain-pal
```

Usage
ChainPal provides several commands to work with blockchain data:

Convert a value between hex and decimal

```bash
chain-pal convert [value]
```

Convert a value in wei to gwei and ether, considering token decimals

```bash
chain-pal convert-unit-wei [value] [decimals]
```

Convert a value in gwei to wei and ether, considering token decimals

```bash
chain-pal convert-unit-gwei [value] [decimals]
```

Convert a value in ether to wei and gwei, considering token decimals

```bash
chain-pal convert-unit-ether [value] [decimals]
```

Process a CSV file containing transactions and output the transaction details,
considering the gas price and gas limit for EVM-like chains

```bash
chain-pal process-csv [httpEndpoint] [csvFilePath]
```
