#!/usr/bin/env node

import yargs from 'yargs';

import { checkAddress, verifyAddress } from './address';
import {
  convert,
  convertUnitEther,
  convertUnitGwei,
  convertUnitWei,
} from './convert';
import { estimateGasWrapper } from './gas';
import { processCsv } from './process-csv';
import { encodeSignature } from './signature';

yargs
  .command(
    'convert <value>',
    'Convert a value between hex and decimal and vice versa',
    (yargs) =>
      yargs.options({
        value: {
          describe: 'The value in hex or decimal format to be converted',
          string: true,
        },
      }),
    convert,
  )
  .command(
    'convert-unit-wei <value> <decimals>',
    'Convert a value in wei to gwei and ether, taking into account the token decimals',
    (yargs) =>
      yargs.options({
        value: {
          describe: 'The value in wei to be converted',
          string: true,
        },
        decimals: {
          describe: 'The number of decimals for the token',
          number: true,
          default: 18,
        },
      }),
    convertUnitWei,
  )
  .command(
    'convert-unit-gwei <value> <decimals>',
    'Convert a value in gwei to wei and ether, taking into account the token decimals',
    (yargs) =>
      yargs.options({
        value: {
          describe: 'The value in gwei to be converted',
          string: true,
        },
        decimals: {
          describe: 'The number of decimals for the token',
          number: true,
          default: 18,
        },
      }),
    convertUnitGwei,
  )
  .command(
    'convert-unit-ether <value> <decimals>',
    'Convert a value in ether to wei and gwei, taking into account the token decimals',
    (yargs) =>
      yargs.options({
        value: {
          describe: 'The value in ether to be converted',
          string: true,
        },
        decimals: {
          describe: 'The number of decimals for the token',
          number: true,
          default: 18,
        },
      }),
    convertUnitEther,
  )
  .command(
    'process-csv <httpEndpoint> <csvFilePath>',
    'Process a CSV file containing transactions and output the transaction details ready to be signed, considering the gas price and gas limit for EVM-like chains',
    (yargs) =>
      yargs.options({
        httpEndpoint: {
          describe: 'The HTTP endpoint for the JSON-RPC provider',
          string: true,
        },
        csvFilePath: {
          describe: 'The file path of the CSV to be processed',
          string: true,
        },
      }),
    processCsv,
  )
  .command(
    'is-contract <httpEndpoint> <address>',
    'Checks if an address is a smart contract or not',
    (yargs) =>
      yargs.options({
        httpEndpoint: {
          describe: 'The HTTP endpoint for the JSON-RPC provider',
          string: true,
        },
        address: {
          describe: 'The address to be check',
          string: true,
        },
      }),
    checkAddress,
  )
  .command(
    'is-valid <address>',
    'Verify the validity of an EVM address',
    (yargs) =>
      yargs.options({
        address: {
          describe: 'The address to verify',
          string: true,
        },
      }),
    verifyAddress,
  )
  .command(
    'estimate-gas <httpEndpoint> <from> <to> <value>',
    'Estimates gas given from, to and value',
    (yargs) =>
      yargs.options({
        httpEndpoint: {
          describe: 'The HTTP endpoint for the JSON-RPC provider',
          string: true,
        },
        from: {
          describe: 'The source address',
          string: true,
        },
        to: {
          describe: 'The target address',
          string: true,
        },
        value: {
          describe: 'The transaction value',
          string: true,
        },
      }),
    estimateGasWrapper,
  )
  .command(
    'encode-signature <signature>',
    'Encode a function signature based on the input',
    (yargs) =>
      yargs.options({
        signature: {
          describe: 'The function signature to encode',
          string: true,
        },
      }),
    encodeSignature,
  )
  .help().argv;
