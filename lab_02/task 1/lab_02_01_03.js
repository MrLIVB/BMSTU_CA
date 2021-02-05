"use strict"

const fs = require("fs");
const readlineSync = require('readline-sync');

const fileExtension = readlineSync.question("Input file extension: ");
const directory = readlineSync.question("Input directory: ");


const files = fs.readdirSync(directory);

function isEqual(s1, s2) {
    let l1 = s1.length;
    let l2 = s2.length;
    if (l1 != l2)
        return false;
    for (let i = 0; i < l1; i++)
        if (s1[i] != s2[i])
            return false;
    return true;
}

for (let i = 0; i < files.length; i++){
    const currentExtension = files[i].split(".")[1];
    if (currentExtension && isEqual(currentExtension, fileExtension)){
        console.log("------\n" + files[i] + ":"); 
        console.log(fs.readFileSync(directory+files[i], "utf-8"));
    }
}