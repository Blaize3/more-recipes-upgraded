import { User } from '../models';
import securePassword from './middleware/bcrypt';
import Token from './middleware/token';
import UserInputValidators from './middleware/uservalidator';

class HandleUserRequests {
    static signup(request, response, next) {
        const userObject = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            sex: request.body.sex
        };

        const validateAccountCreateObject = UserInputValidators.signupValidators(userObject);
        if (validateAccountCreateObject.isNotValid) {
            console.log(validateAccountCreateObject.isNotValid);
            return response.status(400).send({
                message: `${validateAccountCreateObject.errorCount} input fields data are not properly set`,
                data: validateAccountCreateObject.errorMessage
            });
        } else {
            console.log(validateAccountCreateObject.isNotValid);
            User.beforeCreate((userObject) => {
                userObject.password = securePassword.encryptPassword(userObject.password);
                console.log(userObject.password);
            });
            return User
                .create(userObject)
                .then((createdUser) => {
                    return response.status(200).send({
                        message: 'User Account has been created.',
                        data: createdUser
                    });
                })
                .catch((error) => {
                    next(new Error(error.name));
                });
        }
    }

    static signin(request, response, next) {
        return User
            .findOne({
                where: {
                    email: request.body.email
                }
            })
            .then((loggedInUser) => {
                if (!loggedInUser) {
                    return response.status(401).send({
                        message: 'invalid email'
                    });
                }
                const hash = loggedInUser.password;
                const isAuthenticationSuccessful = securePassword.decryptPassword(request.body.password, hash);

                if (isAuthenticationSuccessful) {
                    const payLoad = { userID: loggedInUser.id, email: loggedInUser.email, firstname: loggedInUser.firstname, lastname: loggedInUser.lastname };
                    const token = Token.generateToken(payLoad);
                    return response.status(200).send({
                        message: 'Access granted',
                        data: loggedInUser,
                        token
                    });
                } else {
                    return response.status(401).send({
                        message: 'invalid password'
                    });
                }
            })
            .catch((error) => {
                next(new Error(error.name));
            });
    }

    static password(request, response, next) {
        const userObject = {
            email: request.body.email,
            newPassword: request.body.newPassword
        }

        const validateAccountCreateObject = UserInputValidators.resetPasswordValidators(userObject);
        if (validateAccountCreateObject.isNotValid) {
            console.log(validateAccountCreateObject.isNotValid);
            return response.status(400).send({
                message: `${validateAccountCreateObject.errorCount} input fields data are not properly set`,
                data: validateAccountCreateObject.errorMessage
            });
        } else {
            return User
                .findOne({
                    where: {
                        email: userObject.email
                    }
                })
                .then((user) => {
                    if (!user) {
                        return response.status(404).send({
                            message: 'User account does not exist'
                        });
                    }

                    userObject.newPassword = securePassword.encryptPassword(userObject.newPassword);

                    const updateObject = {
                        id: user.id,
                        email: user.email,
                        password: userObject.newPassword,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        sex: user.sex
                    };

                    return User
                        .update(updateObject, {
                            where: {
                                id: user.id
                            },
                            returning: true,
                            plain: true
                        })
                        .then((updatedUser) => {
                            return response.status(200).send({
                                message: 'Password has been updated',
                                data: updatedUser[1].dataValues
                            });
                        })
                        .catch((error) => {
                            // return response.status(400).send({
                            //     m
                            // });
                            next(new Error(error.name));
                        });
                })
                .catch((error) => {
                    next(new Error(error.name));
                });
        }

    }
}

export default HandleUserRequests;