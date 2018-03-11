#!/usr/bin/env node
const fs = require('fs');

const query = process.argv.slice(2).join(' ');
const db = JSON.parse(fs.readFileSync('db.json'));

/*
 * Andrew Hedges' Levenshtein implementation, under MIT license
 * https://andrew.hedges.name/experiments/levenshtein/levenshtein.js
 */
const levImpl=function(){return function(r,a){var n,t=r.length,v=a.length;if(t<v){var e=r;r=a,a=e;var f=t;t=v,v=f}var o=[];for(o[0]=[],e=0;e<v+1;++e)o[0][e]=e;for(var h=1;h<t+1;++h){o[h]=[],o[h][0]=h;for(var c=1;c<v+1;++c)n=r.charAt(h-1)===a.charAt(c-1)?0:1,o[h][c]=(i=o[h-1][c]+1,u=o[h][c-1]+1,l=o[h-1][c-1]+n,i<=u&&i<=l?i:u<=i&&u<=l?u:l)}var i,u,l;return o}}();
function lev(a, b) {
  let z = levImpl(a, b);
  z = z[z.length - 1];
  return z[z.length - 1];
}

let min = null;
for (const [mod, cmds] of Object.entries(db)) {
  for (const [cmd, desc] of Object.entries(cmds)) {
    if (!min || lev(min.desc, query) > lev(desc, query)) min = {mod, cmd, desc};
  }
}

console.log(`Modl:\t${min.mod}\nCmnd:\t${min.cmd}\nDesc:\t${min.desc}`);