"use strict";

const express = require("express");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.set("view engine", "hbs");

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const game1 = { name: "Doka", descr: "Описание", minAge: 12 };
const game2 = { name: "Cs:Go", descr: "Другое описание", minAge: 18 };
const game3 = { name: "Minecraft", descr: "Можно строить", minAge: 6 };
const games = [game1, game2, game3];

app.get("/page/games", function (request, response) {
    const age = request.query.age;
    let infoObject = {
        descriptionValue: "Список игр",
        gamesArray: []
    };

    for (let i = 0; i < games.length; i++)
        if (games[i].minAge < age)
            infoObject.gamesArray.push(games[i]);

    response.render("pageGames.hbs", infoObject);
});