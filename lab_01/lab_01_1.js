"use strict";

function create(arr, surname, age){
    let child = {};
    for (let i = 0; i < arr.length; i++){
        if (arr[i]["surname"] === surname){
            console.log("There is already such surname");
            return;            
        }
    }
    child["surname"] = surname;
    child["age"] = age;
    arr.push(child);
}

function read(arr, surname){
    if (surname){
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (surname === arr[i]["surname"]){
                found = true;
                console.log("Surname: " + arr[i]["surname"] + "; Age: " + arr[i]["age"] + ";");
                break;
            }
        }
        if (!found)
            console.log("There is no child with such surname");
    }
    else{
        for (let i = 0; i < arr.length; i++) {
            console.log("Surname: " + arr[i]["surname"] + ", Age: " + arr[i]["age"] + ";");
        }
    }
}

function update(arr, key, surname, age){
    let changed = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["surname"] === key) {
            changed = true;
            if (surname)
                arr[i]["surname"] = surname;
            if (age)
                arr[i]["age"] = age;
        }
    }
    if (!changed)
        console.log("There is no child with such surname");
}

function deleteRecord(arr, key){
    let deleted = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["surname"] === key) {
            deleted = true;
            arr.splice(i, 1);
        }
    }
    if (!deleted)
        console.log("There is no child with such surname");
}

function getAverageAge(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        sum += arr[i]["age"];
    }
    let av = sum / arr.length;
    return av;
}

function findOldest(arr){
    let oldest = {};
    oldest["surname"] = "";
    oldest["age"] = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["age"] > oldest["age"]){
            oldest = arr[i];
        }
    }
    return oldest;
}

function findInRange(arr, min, max){
    let res = [];
    let found = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["age"] >= min && arr[i]["age"] <= max){
            res.push(arr[i]);
            found += 1;
        }
    }
    if (found === 0)
        console.log("There are no children in that range");
    return res;
}

function findFirstLetter(arr, letter){
    let res = [];
    let found = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["surname"].charAt(0) === letter){
            res.push(arr[i]);
            found = found + 1;
        }
    }

    if (found === 0)
        console.log("There are no children whose surname starts with that letter");
    return res;
}

function findLonger(arr, len){
    let res = [];
    let found = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["surname"].length > len){
            res.push(arr[i]);
            found = found + 1;
        }
    }

    if (found === 0)
        console.log("There are no children whose surname is longer");
    return res;
}

function findVowel(arr){
    let res = [];
    let vowels = ["A", "E", "I", "O", "U"];
    let found = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let letter in vowels){
            if (arr[i]["surname"].charAt(0) === vowels[letter]){
                res.push(arr[i]);
                found = found + 1;
                break;
            }
        }
    }

    if (found === 0)
        console.log("There are no children whose surname starts with vowel");
    return res;
}

function main(){
    let children = [];
    console.log("Tests with create:");
    create(children, "Kuzin", 10);
    create(children, "Ivanov", 12);
    create(children, "Zhukov", 6);
    create(children, "Alin", 15);
    read(children);
    create(children, "Zhukov", 8);

    console.log("\nTests with read:");
    read(children);
    read(children, "Ivanov");
    read(children, "ASdaw");

    console.log("\nTests with update:");
    update(children, "Asda");
    update(children, "Kuzin", undefined, 11);
    update(children, "Zhukov", "Zhukovkov", 11);
    update(children, "Alin", "Alina", undefined)
    read(children);

    console.log("\nTests with delete:");
    deleteRecord(children, "Kuzin");
    deleteRecord(children, "Zhukov");
    read(children);

    console.log("\nTests with average:");
    console.log(getAverageAge(children));
    create(children, "Smirnov", 9);
    console.log(getAverageAge(children));

    console.log("\nTest with oldest:");
    console.log(findOldest(children));
    // update(children, "Alin", undefined, );

    console.log("\nTests with find in range:");
    read(findInRange(children, 10, 16));
    console.log();
    read(findInRange(children, 13, 16));
    console.log();
    read(findInRange(children, 16, 17));

    console.log("\nTests with find with first letter:");
    read(findFirstLetter(children, "Z"));
    console.log();
    create(children, "Zhuk", 11);
    read(findFirstLetter(children, "Z"));
    read(findFirstLetter(children, "B"));

    console.log("\nTests with find with longer surname:");
    read(findLonger(children, 5));
    read(findLonger(children, 10));

    console.log("\nTests with find first vowel:");
    
    
}

main();
