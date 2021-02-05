"use strict"

let object = {};

let i = 0;
let curobject = object;

while (true) {
    try{
        curobject["field"] = {};
        curobject = curobject["field"];
        JSON.stringify(object);
        i += 1;
    }
    catch{
        console.log(i);
        break;
    }
}
