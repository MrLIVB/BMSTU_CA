"use strict";

const express = require("express");
const fs = require("fs");

const app = express();
const port = 5002;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/insert/record", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const record = {type: obj.type, cost: obj.cost};
        const recordString = JSON.stringify(record) + "\n";
        
        fs.appendFileSync("src/cars.txt", recordString);
        
        response.end(JSON.stringify({
            answer: "Saved"
        }));
    });
});

app.post("/select/record", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);

        let strings = fs.readFileSync("src/cars.txt", "utf-8");
        strings = strings.split("\n");

        let found = false;
        let cost = 0;
        for (let i = 0; i < strings.length && strings[i] !== ""; i++){
            const tobj = JSON.parse(strings[i]);
            if (tobj.type === obj.type){
                cost = tobj.cost;
                found = true;
            }
        }
        
        response.end(JSON.stringify({
            isFound: found,
            cost: cost
        }));
    });
});