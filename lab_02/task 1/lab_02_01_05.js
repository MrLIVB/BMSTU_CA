"use strict"

const fs = require("fs");
const readlineSync = require('readline-sync');

const n = parseInt(readlineSync.question("Input n: "));

let fileNameArr = [];
for (let i = 0; i < n; i++) {
    const line = readlineSync.question("Input file name: ");
    fileNameArr.push(line);
}

let result = ""
for (let i = 0; i < n; i++){
    const content = fs.readFileSync(fileNameArr[i], "utf-8").split("\n");
    for (let j = 0; j < content.length; j++)
        result += " " + content[j].replace("\r", "");
}

fs.writeFileSync("newresult.txt", result);