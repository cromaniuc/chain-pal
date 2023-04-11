# ChainPal

ChainPal is a handy CLI tool for developers working with EVM-like chains. It
provides various useful utilities for conversion, address verification, gas estimation, processing transaction data
from CSV files, and more.

## Installation

To install ChainPal, run the following command:

```bash
npm install -g chain-pal
```

ChainPal provides several commands to work with blockchain data:

### Convert a value between hex and decimal and vice versa.
```bash
chain-pal convert <value>
```
 - value: The value in hex or decimal format to be converted.

### Convert a value in wei to gwei and ether, considering token decimals
```bash
chain-pal convert-unit-wei <value> <decimals>
```
 - value: The value in wei to be converted.
 - decimals: The number of decimals for the token (default: 18).

### Convert a value in gwei to wei and ether, considering token decimals
```bash
chain-pal convert-unit-gwei <value> <decimals>
```
 - value: The value in gwei to be converted.
 - decimals: The number of decimals for the token (default: 18).

### Convert a value in ether to wei and gwei, considering token decimals
```bash
chain-pal convert-unit-ether <value> <decimals>
```
 - value: The value in ether to be converted.
 - decimals: The number of decimals for the token (default: 18).

### Process a CSV file containing transactions and output the transaction details,
considering the gas price and gas limit for EVM-like chains
```bash
chain-pal process-csv <httpEndpoint> <csvFilePath>
```
 - httpEndpoint: The HTTP endpoint for the JSON-RPC provider.
 - csvFilePath: The file path of the CSV to be processed.

### Checks if an address is a smart contract or not.
```bash
chain-pal check-address <httpEndpoint> <address>
```
httpEndpoint: The HTTP endpoint for the JSON-RPC provider.
 - address: The address to be checked.

### Verify the validity of an EVM address.
```bash
chain-pal is-valid <address>
```
 - address: The address to verify.

### Estimates gas given from, to, and value.
```bash
chain-pal estimate-gas <httpEndpoint> <from> <to> <value>
```
 - httpEndpoint: The HTTP endpoint for the JSON-RPC provider.
 - from: The source address.
 - to: The target address.
 - value: The transaction value.
