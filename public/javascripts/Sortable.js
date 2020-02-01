// チャットカードの移動処理
var roomcanvas = document.getElementById("canvas");
let sortable = Sortable.create(roomcanvas, {
    group: "chatcard",
    animation: 200,
    ghostClass: 'blue-background-class'
});