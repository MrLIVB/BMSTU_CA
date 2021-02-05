"use strict";

function create(arr, group, id, marks) {
    let stud = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["id"] === id) {
            console.log("There is already such id");
            return;
        }
    }
    stud["group"] = group;
    stud["id"] = id;
    stud["marks"] = marks;
    arr.push(stud);
}

function read(arr, id) {
    if (id) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (id === arr[i]["id"]) {
                found = true;
                let tmp = ""
                for (let j in arr[i]["marks"])
                    tmp += arr[i]["marks"][j] + ", ";
                console.log("group: " + arr[i]["group"] + "; Id: " + arr[i]["id"] + ";" + " Marks: " + tmp);
                break;
            }
        }
        if (!found)
            console.log("There is no student with such id");
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            let tmp = ""
            for (let j in arr[i]["marks"])
                tmp += arr[i]["marks"][j] + ", ";
            console.log("group: " + arr[i]["group"] + "; Id: " + arr[i]["id"] + ";" + " Marks: " + tmp);
        }
    }
}

function update(arr, key, group, id, marks) {
    let changed = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["id"] === key) {
            changed = true;
            if (group)
                arr[i]["group"] = group;
            if (id)
                arr[i]["id"] = id;
            if (marks)
                arr[i]["marks"] = marks;
        }
    }
    if (!changed)
        console.log("There is no student with such id");
}

function deleteRecord(arr, key) {
    let deleted = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["id"] === key) {
            deleted = true;
            arr.splice(i, 1);
        }
    }
    if (!deleted)
        console.log("There is no student with such id");
}

function averageMark(arr, id){
    let av = 0;
    let l = 0;
    let found = false;
    for (let i = 0; i < arr.length; i++){
        if (arr[i]["id"] === id){
            found = true
            l = arr[i]["marks"].length;
            for (let j in arr[i]["marks"])
                av += arr[i]["marks"][j];
            break;
        }
    }
    if (!found){
        console.log("There is no such student");
    }
    av = av / l;
    return av;
}

function readGroup(arr, group){
    let found = false;
    let res = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["group"] === group){
            found = true;
            res.push(arr[i]);
        }
    }
    
    if (!found)
        console.log("There is no such group");
    return  res;
}

function findMoreMarks(arr, group) {
    let found = false;
    let res = {};
    let l = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["group"] === group && arr[i]["marks"].length > l){
            found = true;
            res = arr[i];
            l = arr[i]["marks"].length;
        }
    }

    if (!found)
        console.log("There is no such group");
    return res;
}

function findNoMarks(arr) {
    let found = false;
    let res = {};

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]["marks"].length === 0) {
            found = true;
            res = arr[i];
        }
    }

    if (!found)
        console.log("There is no such group");
    return res;
}

function main() {
    let students = [];
    console.log("Tests with create:");
    create(students, 12, 132, [4, 4, 5]);
    create(students, 12, 113, [4, 3, 3, 5]);
    create(students, 11, 126, [5, 5, 3, 5, 4]);
    create(students, 13, 125, [3, 3, 3]);
    read(students);
    create(students, 13, 132, [3, 3, 3]);
    

    console.log("\nTests with read:");
    read(students);
    console.log();
    read(students, 132);
    read(students, 1);

    console.log("\nTests with update:");
    update(students, 132, 13, 133, [5, 4, 5]);
    update(students, 133, 12, undefined, [4, 4, 5]);
    read(students);
    console.log();
    update(students, 1, 12, undefined, [4, 4, 5]);

    console.log("\nTests with delete:");
    deleteRecord(students, 125);
    read(students);
    deleteRecord(students, 100);

    console.log("\nTests with average mark:");
    console.log(averageMark(students, 133));
    console.log(averageMark(students, 126));
    console.log(averageMark(students, 12));

    console.log("\nTests with reading group:");
    read(readGroup(students, 12));
    read(readGroup(students, 100));

    console.log("\nTests with finding more marks:");
    console.log(findMoreMarks(students, 12));

    console.log("\nTests with finding no marks:");
    create(students, 15, 150, []);
    console.log(findNoMarks(students));
}

main();
