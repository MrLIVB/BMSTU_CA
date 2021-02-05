"use strict"

const fs = require("fs");

function findFiles(directory){ 
    const everything = fs.readdirSync(directory);
    for (let i = 0; i < everything.length; i++){
        const file = everything[i].split(".");
        if (file.length === 1){
            findFiles(directory + "/" + everything[i]);
        }
        else{
            const fileName = directory + "/" + everything[i];
            if (fs.readFileSync(fileName, "utf-8").length <= 10)
                console.log(fileName);
        }
    }
}

findFiles("test");