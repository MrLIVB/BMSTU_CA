"use strict";

function create(arr, name, x, y) {
    let point = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["name"] === name) {
            console.log("There is already such name");
            return;
        }
    }
    point["name"] = name;
    point["x"] = x;
    point["y"] = y;
    arr.push(point);
}

function read(arr, name) {
    if (name) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (name === arr[i]["name"]) {
                found = true;
                console.log("Name: " + arr[i]["name"] + "; X: " + arr[i]["x"] + ";" + " Y: " + arr[i]["y"]);
                break;
            }
        }
        if (!found)
            console.log("There is no point with such name");
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            console.log("Name: " + arr[i]["name"] + "; X: " + arr[i]["x"] + ";" + " Y: " + arr[i]["y"]);
        }
    }
}

function update(arr, key, name, x, y) {
    let changed = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["name"] === key) {
            changed = true;
            if (name)
                arr[i]["name"] = name;
            if (x)
                arr[i]["x"] = x;
            if (y)
                arr[i]["y"] = y;
        }
    }
    if (!changed)
        console.log("There is no point with such name");
}

function deleteRecord(arr, key) {
    let deleted = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["name"] === key) {
            deleted = true;
            arr.splice(i, 1);
        }
    }
    if (!deleted)
        console.log("There is no point with such name");
}

function findDist(x1, y1, x2, y2){
    let d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return d;
}

function maxDist(arr){
    let dist = 0;
    let p1, p2 = {};
    for (let i = 0; i < arr.length - 1; i++){
        for (let j = i + 1; j < arr.length; j++){
            let tmp = findDist(arr[i]["x"], arr[i]["y"], arr[j]["x"], arr[j]["y"]);
            if (tmp > dist){
                dist  = tmp;
                p1 = arr[i];
                p2 = arr[j];
            }
        }
    }
    return [p1, p2];
}

function closer(arr, name, dist){
    let res = [];
    let ind = -1;
    for (let i = 0; i < arr.length; i++){
        if (arr[i]["name"] == name){
            ind = i;
            break;
        }
    }
    if (ind === -1){
        console.log("There is no point with such name");
        return res;
    }
    
    for (let i = 0; i < arr.length; i++){
        if (i != ind)
        {
            let tmp = findDist(arr[ind]["x"], arr[ind]["y"], arr[i]["x"], arr[i]["y"]);
            if (tmp <= dist)
                res.push(arr[i]);
        }
    }
    return res;
}

function side(arr, axes, side){
    let res = [];
    for (let i = 0; i < arr.length; i++){
        if (axes === 1){
            if (side === 1 && arr[i]["y"] > 0)
                res.push(arr[i]);
            else if (side === -1 && arr[i]["y"] < 0)
                res.push(arr[i]);
        }
        else if (axes === 2){
            if (side === 1 && arr[i]["x"] > 0)
                res.push(arr[i]);
            else if (side === -1 && arr[i]["x"] < 0)
                res.push(arr[i]);
        }
    }
    return res;
}

function inside(arr, xl, xr, yt, yb){
    let res = [];
    for (let i = 0; i < arr.length; i++){
        if ((xl < arr[i]["x"] && arr[i]["x"] < xr) && (yb < arr[i]["y"] && arr[i]["y"] < yt))
            res.push(arr[i]);
    }
    return res;
}

function main() {
    let points = [];
    console.log("Tests with create:");
    create(points, "first", 1, 1);
    create(points, "second", 1, -1);
    create(points, "third", -2, -2);
    create(points, "fourth", -2, 1);
    read(points);
    create(points, "first", 1, 2);

    console.log("\nTests with read:");
    read(points);
    console.log();
    read(points, "first");
    read(points, "no");

    console.log("\nTests with update:");
    update(points, "second", "second2", 1, 2);
    read(points);
    console.log();

    update(points, "second2", "second");
    read(points);
    update(points, "second2");

    console.log("\nTests with delete:");
    deleteRecord(points, "first");
    read(points);
    deleteRecord(points, "first");

    console.log("\nTests with max distance:");
    read(points)
    console.log(maxDist(points));
    
    console.log("\nTests with close enough points:");
    read(points);
    create(points, "new", 10, 2);
    read(closer(points, "second", 4.5));

    console.log("\nTests with side:");
    read(side(points, 1, 1));
    console.log();
    read(side(points, 2, -1));

    console.log("\nTests with inside rect:");
    read(inside(points, -3, 3, 3, -3));
}

main();
