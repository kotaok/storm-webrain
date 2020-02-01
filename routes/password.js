'use strict';
// ハッシュ関数
module.exports.cryc = function (PASS) {
    const crypto = require("crypto");
    const sha = (crypto.createHash('sha256').update(PASS).digest('hex'));
    return sha;
}

