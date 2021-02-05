"use strict"

const fileName = "result.txt";
const fs = require("fs");

if (!fs.existsSync(fileName)){
    console.log("File not found!");
}
const jsonArr = fs.readFileSync(fileName, "utf8");

const stringArr = JSON.parse(jsonArr);

function isVowel(letter) {
    const vowels = ["a", "e", "i", "o", "u"];
    let vowel = false;
    for (let j = 0; j < vowels.length; j++) {
        if (letter === vowels[j])
            vowel = true;
    }
    return vowel;
}

function checkOnlyVowels(stringToCheck){
    for (let i = 0; i < stringToCheck.length; i++){
        if (!isVowel(stringToCheck[i]))
            return false;
    }
    return true;
}

for (let i = 0; i < stringArr.length; i++){
    if (checkOnlyVowels(stringArr[i]))
        console.log(stringArr[i]);
}