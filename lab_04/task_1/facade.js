"use strict";

const express = require("express");
const request = require("request");

const app = express();
const port = 5000;
app.listen(port);

app.use(express.static(__dirname + "/src"));
console.log(`Server listens port ${port}`);

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if (error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/save/car", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const type = obj.type;
        const cost = obj.cost;
        sendPost("http://localhost:5002/insert/record", JSON.stringify({
            type: type,
            cost: cost
        }), function(answerString){
                response.end(answerString);
        })
    });
});

app.post("/get/car", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const type = obj.type;
        sendPost("http://localhost:5002/select/record", JSON.stringify({
            type: type
        }), function (answerString) {
                response.end(answerString);
        })
    });
});

app.post("/save/whouse", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        const cars = obj.cars;
        sendPost("http://localhost:5001/insert/record", JSON.stringify({
            name: name,
            cars: cars
        }), function (answerString) {
            response.end(answerString);
        })
    });
});

app.post("/get/whouse", function (request, response) {
    loadBody(request, function (body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        console.log(name);
        sendPost("http://localhost:5001/select/record", JSON.stringify({
            name: name
        }), function (answerString) {
            response.end(answerString);
        })
    });
});