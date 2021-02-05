"use strict";

// let seconds = 0;
// let rep = 0;

// let pause = 1000;
// let int1 = setInterval(() => {
//     seconds++;
//     console.log(seconds);
//     if (seconds === 10)
//         pause /= 2;
//         console.log(pause);
//     if (seconds === 20)
//         clearInterval(int1)
// }, pause);


// pause = 1000
// let end = 1;

// function stop(){
//     if (rep === end)
//         clearInterval(interval);
// }

// let interval = setInterval(() => {
//     seconds = 0;
//     let int1 = setInterval(() => {
//         seconds++;
//         console.log(seconds);
//         if (seconds === 10)
//             pause /= 2;
//         console.log(pause);
//         if (seconds === 20)
//             clearInterval(int1)
//     }, pause);
// }, );


let rep = 0;

function callInt1(){
    let seconds = 0;

    let int1 = setInterval(() => {
        seconds++;
        console.log(seconds);
        if (seconds === 1){
            clearInterval(int1)
            callInt2();
        }
    }, 50);
}

function callInt2(){
    let seconds = 1;

    let int1 = setInterval(() => {
        seconds++;
        console.log(seconds);
        if (seconds === 2) {
            clearInterval(int1)
            callInt1();
        }
    }, 100);
}

callInt1();