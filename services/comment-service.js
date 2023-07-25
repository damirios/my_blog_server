const CommentModel = require('../models/comment');

class CommentService {
    constructor() {}

    getUserComments(userId) {
        return CommentModel.find({author: userId});
    }

    getArticleComments(articleId) {
        return CommentModel.find({articleId});
    }

    getProjectComments(projectId) {
        return CommentModel.find({projectId});
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
}

module.exports = new CommentService();