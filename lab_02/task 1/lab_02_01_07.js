"use strict"

const fs = require("fs");

function findDeepest(object) {
    let level = 1;
    for (let key in object) {
        if (typeof object[key] == 'object') {
            let depth = findDeepest(object[key]) + 1;
            level = Math.max(depth, level);
        }
    }
    return level;
}

let arr = []

function outputDeepest(object, maxDepth, curDepth=1) {
    if (curDepth === maxDepth){
        return 1;
    }
        
    for (let key in object) {
        if (typeof object[key] == 'object') {
            if (outputDeepest(object[key], maxDepth, curDepth + 1)){
                arr.push(key);
                return 1;
            }
        }
    }
    return 0;
}

function findOutputDeepest(object) {
    const maxDepth = findDeepest(object);
    outputDeepest(object, maxDepth);
    console.log(arr.reverse());
}


let fileName = 'treeObject.json';
const objectToLook = JSON.parse(fs.readFileSync(fileName, "utf-8"));
findOutputDeepest(objectToLook);