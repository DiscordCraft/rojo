#!/usr/bin/env node
const fs = require('fs');

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) buffer += chunk;
});
process.stdin.on('end', () => {
  const db = {};
  const data = JSON.parse(fs.readFileSync('db.json', {encoding: 'utf8'}));
  for (const [modName, cmds] of Object.entries(data)) {
    let mod = db[modName];
    if (!mod) mod = db[modName] = {};
    for (const [cmd, desc] of Object.entries(cmds)) mod[cmd] = desc;
  }
  for (const [mod, cmds] of Object.entries(JSON.parse(buffer))) {
    if (!db.hasOwnProperty(mod)) {
      console.log(`NewMod ${mod}`);
    } else {
      for (const [cmd, desc] of Object.entries(cmds)) {
        if (!db[mod].hasOwnProperty(cmd)) {
          console.log(`NewCmd ${mod}/${cmd}`);
        } else if (db[mod][cmd] !== desc) {
          console.log(`CmdDif ${mod}/${cmd}: ${desc} from ${db[mod][cmd]}`);
        }
      }
    }
  }
});