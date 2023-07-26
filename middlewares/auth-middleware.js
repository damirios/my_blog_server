const tokenService = require('../services/token-service');

function authorizationCheck(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("Пользователь не авторизован");
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
        throw new Error("Пользователь не авторизован");
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        throw new Error("Пользователь не авторизован");
    }

    req.user = userData;
    next();
}

module.exports = authorizationCheck;