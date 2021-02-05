"use strict";

const execSync = require('child_process').execSync;


let i = 2;
while(true){
    const number = "" + process.argv[i];
    if (!isNaN(parseInt(number)))
        console.log(execSync(`node factorial.js ${number}`, {encoding: 'utf8'}));
    else
        break;
    i++;
}