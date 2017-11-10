import { User } from '../../models';
import Token from './token';

class checkUserAuthentication {

    static isAuthenticated(request, response, next) {
        const token = request.body.token || request.query.token || request.headers['x-access-token'];
        const decoded = Token.decodeToken(token);

        if (decoded === 'no token') {
            return response.status(401).send({
                message: 'Access denied..'
            });
        } else if (decoded === 'token verification failed') {
            return response.status(401).send({
                message: 'Authentication failed, please try again...'
            });
        } else {
            return User
                .findOne({ id: decoded.userID })
                .then((user) => {
                    if (!user) {
                        return response.status(401).send({
                            message: 'Something wicked happened!!!'
                        });
                    }
                    request.decoded = decoded;
                    next();
                })
                .catch(() => {
                    return response.status(500).send({
                        message: 'Authentication failed...'
                    });
                });
        }
    }
}