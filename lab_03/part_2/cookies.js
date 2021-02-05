"use strict";

const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/save", function (request, response) {
    const login = request.query.login;
    const password = request.query.password;
    
    if (!login) return response.end("Login not set");
    if (!password) return response.end("Password not set");
    
    request.session.login = login;
    request.session.password = password;

    response.end("Set cookie ok");
});

class User{
    constructor(login, password, hobby, age){
        this.login = login;
        this.password = password;
        this.hobby = hobby;
        this.age = age;
    }
}

const users = [new User("qwer", "qwer", "Tennis", 16), 
               new User("smt", "123", "Chess", 25), 
               new User("Chad", "Cool", "Being cool", 20)]



app.get("/api/get", function (request, response) {

    if (!request.session.login) return response.end("Not exists");
    if (!request.session.password) return response.end("Not exists");
    
    const login = request.session.login;
    const password = request.session.password;
    let hobby = "";
    let age = 0;
    
    let found = false;
    for (let i = 0; i < users.length; i++)
        if (login == users[i].login && password == users[i].password){
            found = true;
            hobby = users[i].hobby;
            age = users[i].age;
            break;
        }
            
    if (found){
        response.end(JSON.stringify({
            login,
            password,
            hobby,
            age
        }));
    }
    else{
        response.end("There is no such user");
    }
});