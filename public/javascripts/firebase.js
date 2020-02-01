var roomid = GetParamId();
var db = firebase.database();
var myChatAll = db.ref("messages/" + roomid + "/");
var text = document.getElementById("send-text");
var output = document.getElementById("canvas");
const title = document.getElementById("title");
const alert_ms = document.getElementById("alert_ms")
const room_reload = document.getElementById("room_reload");
let OKNG　= false;

// 存在しないルームへの投稿は不可
myChatAll.once("value", function (snapshot) {
  let ROOMID = snapshot.val();
  if (ROOMID != null && roomid != "FAILED") {
    OKNG = true;
    title.innerHTML  = "WeBrain";
  }
  else {
    OKNG = false;
    title.innerHTML  = "エラー:ルームが存在しません。";
    alert_ms.innerHTML = "このルームは使用できません。";
    room_reload.innerHTML = "";
  };
});

// チャットメッセージの送信
function AddData() {
  if (OKNG) {
    var text = document.getElementById("send-text");
    let TEXT = text.value;
    TEXT = escape(TEXT); 
    TEXT = TEXT.trim(); // 前後の空白をトリム
    if (0 < TEXT.length && TEXT.length < 70) { //文字数の条件を満たせば投稿
      myChatAll.push({
        text:TEXT,
        time:firebase.database.ServerValue.TIMESTAMP,
        senduser:firebase.auth().currentUser.uid
      });
      text.value = ""; // 入力欄リセット
      document.getElementById("strlength").innerText = 0;
      document.getElementById("strlength").style.color = "rgb(24, 172, 24)";
    }
    else {
      text.value = "";
      document.getElementById("strlength").innerText = 0;
      document.getElementById("strlength").style.color = "rgb(24, 172, 24)";
      alert("空白または70文字以上のメッセージは投稿できません。");
    }
  };
};

// チャットメッセージの全削除
function RemoveData() {
  if (OKNG) {
    if (confirm("メッセージを削除します。")) {
      myChatAll.remove(); 
      myChatAll.push({ // メッセージを残さないと部屋まで削除されるので1つ残しておく
        text:"チャット一覧",
        senduser:"welcome"
      });
    };
  };
};



// 再読み込みボタン
function Reload() {
  location.reload(); 
};


// 削除時の画面自動更新
myChatAll.on("child_removed", function () {
    let str = '';
    output.innerHTML = str;
});

// 投稿時の画面自動更新
myChatAll.on("child_added", function (snapshot) { 
  const v = snapshot.val();
  let str = "";        
  str += '<div class="chatcard" name="'+v.senduser+'">'+'<div class="chatmessage">'+v.text+'</div>'+'<div class="chatsenduser">'+'ID:'+v.senduser+'</div>'+'</div>';
  output.innerHTML += str;
});


