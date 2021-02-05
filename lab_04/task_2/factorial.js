"use strict";

const number = process.argv[2];
let factorial = 1;
for (let i = 2; i <= number; i++)
    factorial *= i;

console.log(factorial);