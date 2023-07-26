const bcrypt = require("bcrypt");

const tokenService = require('./token-service');
const UserModel = require('../models/user');

class UserService {
    constructor() {}

    getUsers() {
        return UserModel.find({});
    }

    getUserById(id) {
        return UserModel.findById(id);
    }

    async createUser(userDto) {
        const candidate = await UserModel.findOne({login: userDto.login});
        if (candidate) {
            throw new Error("Пользователь с таким логином уже существует");
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 3);
        const user = await UserModel.create({
            login: userDto.login,
            password: hashedPassword,
            name: {
                first: userDto.firstname,
                last: userDto.lastname
            },
            registrationDate: new Date(),
            isBanned: false
        });

        return user;
    }

    async updateUser(userDto, id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("Пользователь с таким логином не найден");
        }

        if (userDto.login) {
            user.login = userDto.login;
        }

        if (userDto.password) {
            const hashedPassword = await bcrypt.hash(userDto.password, 3);
            user.password = hashedPassword;
        }

        if (userDto.firstname) {
            user.name.first = userDto.firstname;
        }

        if (userDto.lastname) {
            user.name.last = userDto.lastname;
        }

        await user.save();
        return user;
    }

    async login(userDto) {
        const {login, password} = userDto;
        const user = await UserModel.findOne({login});
        if (!user) {
            throw new Error("Пользователь с таким логином не зарегистрирован");
        }

        const arePasswordsMatch = await bcrypt.compare(password, user.password);
        if (!arePasswordsMatch) {
            throw new Error("Неверный пароль");
        }

        const tokens = await tokenService.generateTokens({userId: user.id, login});
        await tokenService.saveTokenInDB(user.id, tokens.refreshToken);
        return {...tokens, login: user.login, userId: user.id};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeTokenFromDB(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDB) {
            throw new Error("Пользователь не авторизован");
        }

        const tokens = await tokenService.generateTokens({userId: userData.userId, login: userData.login});
        await tokenService.saveTokenInDB(userData.userId, tokens.refreshToken);
        return {...tokens, login: userData.login, userId: userData.userId};
    }
}

module.exports = new UserService();