"use strict";

window.onload = function () {
    const post = document.getElementById("post")

    const btn = document.getElementById("send-btn")

    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function () {
            callback(r.response);
        };
    };

    btn.onclick = function () {
        const a = post.value;
        const url = `/find?a=${a}`;
        ajaxGet(url, function (stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            alert(result);
        });
    };
};