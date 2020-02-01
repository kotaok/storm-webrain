'use strict';
var express = require('express');
var router = express.Router();
const admin = require("firebase-admin");
var db = admin.database();
let ROOMID = "";
let messages = "/messages";
var passwordgene = require('./passwordgene');
var passwordsha = require('./password');

router.post('/', function(req, res, next) {
    // 部屋IDを新規発行
    let roomid = passwordgene.PasswordGene();
    let pass =  passwordgene.PasswordGene();
    let hash = passwordsha.cryc(pass);
    ROOMID = passwordsha.cryc(roomid);

    //　発行したIDが既存IDと被っていなければ使用
    let roomsDB = db.ref("rooms/"+ROOMID);
    let testsDB = db.ref("rooms/"+ROOMID+"/roomkey");
    testsDB.once("value", function(snapshot) {
        if (snapshot.val() == null) {
            roomsDB.set({
                roomkey:hash
            });
            let messagesDB = db.ref(messages+"/"+ROOMID);
            messagesDB.push({
                text:"チャット一覧",
                senduser:"welcome",
                time:Date.now()
            });
            res.render('newroom', {ROOMID:ROOMID, pass:pass, roomid:roomid, hashid:hash} );
        }
        else {
            res.render("index", {ERROR: "エラーが発生しました。もう一度作成してください。"});
        };
    });
});
      
module.exports = router;