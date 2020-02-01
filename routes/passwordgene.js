module.exports.PasswordGene = function () {
    // ランダムID生成
    const length = 8;
    const charset = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
    'abcdefghijklmnopqrstuvwxyz' + 
    '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    };
    return password;
};