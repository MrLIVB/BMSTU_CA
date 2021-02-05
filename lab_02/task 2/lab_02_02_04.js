"use strict";

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function (request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

function formArray(a, b, c) {
    let result = [];
    for (let i = a; i <= b; i++) {
        if (i % c === 0)
            result.push(i);
    }
    return result;
}   

app.get("/output/array", function (request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c);
    const elements = formArray(a, b, c)
    const answerJSON = JSON.stringify({ result: elements });
    response.end(answerJSON);
});