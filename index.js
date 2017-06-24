#!/usr/bin/env node
'use strict';

const os = require('os'),
  chalk = require('chalk');
// gets all network interfaces that have been assigned network addresses
let networkInterfaces = os.networkInterfaces();
// gets the external IPv4 address
let addresses = networkInterfaces.en1
  .filter(address => address.family === 'IPv4' && !address.internal)
  .map(address => address.address);

// in case you want to use this in another js file
module.exports = addresses;

// print the address to the console
let chalkMethod;
if (process.argv[2]) {
  chalkMethod = chalk[process.argv[2]];
} else {
  chalkMethod = chalk.green;
}
try {
  addresses.forEach(address => {
    console.log(chalkMethod(`\n${address}\n`));
  });
  process.exit(0);
} catch (err) {
  // probably an invalid chalk method
  console.log(chalk.red('Invalid chalk color. Valid colors are:\nblack\nred\ngreen\nyellow\nblue\nmagenta\ncyan\nwhite\ngray'));
  process.exit(1);
}
