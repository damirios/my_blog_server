const userService = require('../services/user-service');

class UserController {
    constructor() {}

    getUsers = async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (error) {
            return next(error)
        }
    };
    
    getUserById = async (req, res, next) => {
        const {id} = req.params;
        try {
            const user = await userService.getUserById(id);
            res.json(user);
        } catch (error) {
            return next(error);
        }
    }
    
    createUser = async (req, res, next) => {
        const {login, password, firstname, lastname} = req.body;
        try {
            const user = await userService.createUser({login, password, firstname, lastname});
            res.json(user);
        } catch (error) {
            return next(error);
        }
    }
    
    updateUser = async (req, res, next) => {
        const {login, password, firstname, lastname} = req.body;
        const {id} = req.params;
        try {
            const user = await userService.updateUser({login, password, firstname, lastname}, id);
            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    login = async (req, res, next) => {
        const {login, password} = req.body;
        try {
            const {user, accessToken, refreshToken} = await userService.login({login, password});
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}); // 30 дней
            res.json({user, accessToken, refreshToken});
        } catch (error) {
            return next(error);
        }
    }

    logout = (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            const tokenData = userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(tokenData);
        } catch (error) {
            return next(error);
        }
    }

    refresh = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                throw new Error("Пользователь не авторизован");
            }
            
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UserController();