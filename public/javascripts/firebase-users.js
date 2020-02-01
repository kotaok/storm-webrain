// firebase匿名認証
const DB = firebase.database();


firebase.auth().signInAnonymously().catch( (error) => {
    console.log(`[error] Can not signin anonymouse (${error.code}:${error.message})`);
});

firebase.auth().onAuthStateChanged( (user) => {
    if ( user ) {
        let uid = user.uid;
        let user_id = DB.ref("users/" + uid + "/rooms/" + roomid + "/");
        user_id.set({
            id:roomid
        });
    };
});