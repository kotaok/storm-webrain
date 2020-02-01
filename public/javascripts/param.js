'use strict';
// ルームIDの処理
function GetParamId() {
    if (1 < document.location.search.length) {
        var param = escape(location.search);
        if (param.match("&")) {
            return "FAILED";
        }
        else {
            var param = location.search.substring(1);
            var params = param.split('=');
            var result = params[1];
            return result;
        };
    };
    return "FAILED";
};

