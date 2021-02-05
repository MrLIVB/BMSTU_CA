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


function generateHtml(fields, address) {
    let pageHtml = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n\n<title>Автоматически</title>\n</head>\n<body>';
    pageHtml += '<h1>Автоматически</h1><form method = "GET" action="' + address + '">\n';
    for (let i = 0; i < fields.length; i++) {
        pageHtml += '<p>' + fields[i] + '</p> \n<input name = "' + fields[i] + '" spellcheck = "false" autocomplete = "off" >\n';
    };
    pageHtml += '<br>\n<br>\n<input type="submit" value="Отправить запрос">\n</form>\n</body>\n</html>';
    return pageHtml;
}

app.get("/me/generate", function (request, response) {
    const fields = request.query.fields;
    const address = request.query.address;
    let fieldsArray = fields.split(",");
    let pageHtml = generateHtml(fieldsArray, address);
    response.end(pageHtml);
});