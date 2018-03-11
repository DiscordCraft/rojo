#!/usr/bin/env node
const fs = require('fs');

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) buffer += chunk;
});
process.stdin.on('end', () => {
  const catted = {};
  function cat(data) {
    data = JSON.parse(data);
    for (const [modName, cmds] of Object.entries(data)) {
      let mod = catted[modName];
      if (!mod) mod = catted[modName] = {};
      for (const [cmd, desc] of Object.entries(cmds)) mod[cmd] = desc;
    }
  }
  for (let i = 2; i < process.argv.length; i++) cat(fs.readFileSync(process.argv[i], {encoding: 'utf8'}));
  cat(buffer);
  process.stdout.write(JSON.stringify(catted, null, '  '));
});