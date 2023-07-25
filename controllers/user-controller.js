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
}

module.exports = new UserController();