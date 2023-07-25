const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token');

class TokenService {
    constructor() {}

    async generateTokens(payload) {
        const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m'
        });

        const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '60d'
        });

        return {accessToken, refreshToken}
    }

    async saveTokenInDB(userId, token) {
        const tokenInDB = await TokenModel.findOne({userId});
        if (tokenInDB) {
            tokenInDB.refreshToken = token;
            return tokenInDB.save();
        }

        const newToken = await TokenModel.create({userId, refreshToken: token});
        return newToken;
    }

    async removeTokenFromDB(token) {
        const tokenInDB = await TokenModel.findOneAndDelete({refreshToken: token});
        return tokenInDB;
    }
}

module.exports = new TokenService();