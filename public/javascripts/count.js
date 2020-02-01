// 文字数カウント
'use strict';
function countStr() {
    var len = document.getElementById("send-text").value;
    len = len.trim().length; //両端の空白はカウントしない
    var strlen = document.getElementById("strlength");
    strlen.innerText = len;
    if (len > 69) { 
        strlen.style.color = "red"; // オーバーしたら色変更
    }
    else {
        strlen.style.color = "rgb(24, 172, 24)"
    }
};