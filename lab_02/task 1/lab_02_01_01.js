"use strict"

const fs = require("fs");
const fileName = "result.txt";

const readlineSync = require('readline-sync');
const n = parseInt(readlineSync.question("Input N: "));

let stringArr = [];
for (let i = 0; i < n; i++){
    const line = readlineSync.question("Input string: ");
    if (line.length % 2 === 0)
        stringArr.push(line);
}

fs.writeFileSync(fileName, JSON.stringify(stringArr));