"use strict";

function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function () {
        callback(r.response);
    }
}

function addCar(){
    const typeField = document.getElementById("car-type");
    const costField = document.getElementById("car-cost");
    let resField = document.getElementById("result-label");

    ajaxPost("/save/car", JSON.stringify({
        type: typeField.value,
        cost: costField.value
    }), function(answerString){
        resField.innerHTML = JSON.parse(answerString).answer;
    });
}

function getCar() {
    const typeField = document.getElementById("car-type2");
    let resField = document.getElementById("result-label2");

    ajaxPost("/get/car", JSON.stringify({
        type: typeField.value,
    }), function (answerString) {
        const answerObject = JSON.parse(answerString);
        const found = answerObject.isFound;
        const cost = answerObject.cost;
        if (found)
            resField.innerHTML = 'Cost = ' + cost;
        else
            resField.innerHTML = 'Not found';
    });
}

function addWarehouse() {
    const nameField = document.getElementById("whouse-name");
    const carsField = document.getElementById("whouse-cars");
    let resField = document.getElementById("result-label3");

    const carsString = carsField.value;
    const cars = carsString.split(",");

    ajaxPost("/save/whouse", JSON.stringify({
        name: nameField.value,
        cars: cars
    }), function (answerString) {
        resField.innerHTML = JSON.parse(answerString).answer;
    });
}

function getWarehouse() {
    const nameField = document.getElementById("whouse-name2");
    let resField = document.getElementById("result-label4");

    ajaxPost("/get/whouse", JSON.stringify({
        name: nameField.value,
    }), function (answerString) {
        const answerObject = JSON.parse(answerString);
        const found = answerObject.isFound;
        const cars = answerObject.cars;
        if (found)
            resField.innerHTML = 'Cars: ' + cars;
        else
            resField.innerHTML = 'Not found';
    });
}
