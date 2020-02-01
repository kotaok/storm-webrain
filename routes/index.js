var express = require('express');
var router = express.Router();
var passwordsha = require('./password');
const admin = require("firebase-admin");
var db = admin.database();
var passwordsha = require('./password');
var escape = require('./escape');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// IDとパスワード受け取り時の認証処理
router.post('/', function(req, res, next) {
  const room_hash = passwordsha.cryc(escape.escape(req.body.roomid)); //入力値を受け取る
  const pass_hash = passwordsha.cryc(escape.escape(req.body.key));
  let RoomsDB = db.ref("rooms/"+room_hash);

  RoomsDB.on("value", function(snapshot) {
    let RoomsKey = snapshot.val()
    if (RoomsKey != null) {
      let KEY = RoomsKey.roomkey;
      if (pass_hash === KEY) {　// 入力値と設定値が合っていた場合
        Roomskey = "";
        KEY = "";
        res.render("join", { JOINROOMID:room_hash });
      }
      else { // パスワードが違っていた場合
        Roomskey = "";
        KEY = "";
        res.render("index", {ERROR: "パスワードが違います"});
      };
    }
    else { // 存在しないルームIDを入力した場合
      Roomskey = "";
      KEY = "";
      res.render("index", {ERROR: "そのルームは存在しません"});
    };
  }
  , function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

module.exports = router;
