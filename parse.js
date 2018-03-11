#!/usr/bin/env node
const Parser = require('./parser.js');
const parser = new Parser();

let buffer = '';
function appendBuffer(data) {
  buffer += data;
  const lines = buffer.split('\n');
  for (let i = 0; i < lines.length - 1; i++) parser.accept(lines[i]);
  buffer = lines[lines.length - 1];
}
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) appendBuffer(chunk);
});
process.stdin.on('end', () => {
  if (buffer.length) parser.accept(buffer);
  process.stdout.write(JSON.stringify(parser.parsed, null, '  '));
});