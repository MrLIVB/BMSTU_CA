"use strict"

const express = require("express");
const fs = require("fs");

const app = express();
const port = 5000;
app.listen(port);
console.log('Server on port 5000');

const way = __dirname + "/static";
app.use(express.static(way));

// Headers
app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function checkUnique(post, phone){
    let unique = true;
    let lines = fs.readFileSync("records.txt", "utf-8");
    lines = lines.split("\n")
    for (let i = 0; i < lines.length; i++){
        const data = lines[i].split(" ");
        if (post === data[0] || phone === data[2]){
            unique = false;
            break;
        }
    }
    return unique;
}

app.post("/save/info", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const post = obj["a"];
        const surname = obj["b"];
        const phone = obj["c"];

        if (checkUnique(post, phone)){
            const contentString = `${post} ${surname} ${phone}\n`;
            fs.appendFileSync("records.txt", contentString);
            response.end(JSON.stringify({
                result: "Save content ok"
            }));
        }
        else{
            response.end(JSON.stringify({
                result: "Content isn't unique"
            }));
        }
    });
});

function findByPost(post) {
    let result = null;
    let lines = fs.readFileSync("records.txt", "utf-8");
    lines = lines.split("\n")
    for (let i = 0; i < lines.length; i++) {
        const data = lines[i].split(" ");
        if (post === data[0]) {
            result = lines[i];
            break;
        }
    }
    return result;
}

app.get("/find", function (request, response) {
    const post = request.query.a;
    
    const s = findByPost(post);
    
    if (s != null)
        response.end(JSON.stringify({
            result: s
        }));
    else{
        const ans = "There is no such post";
        response.end(JSON.stringify({
            result: ans
        }));
    }
});