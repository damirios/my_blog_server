const userService = require('../services/user-service');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        return next(error)
    }
};

exports.getUserById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.createUser = async (req, res, next) => {
    const {login, password, firstname, lastname} = req.body;
    try {
        const user = await userService.createUser({login, password, firstname, lastname});
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    const {login, password, firstname, lastname} = req.body;
    const {id} = req.params;
    try {
        const user = await userService.updateUser({login, password, firstname, lastname}, id);
        res.json(user);
    } catch (error) {
        return next(error);
    }
}