import jwt from 'jsonwebtoken';
import code from '../../../code';

class Token {
    static generateToken(payLoad) {
        const token = jwt.sign(payLoad, code.secret);
        return token;
    }

    static decodeToken(tokenObject) {
        if (tokenObject) {
            jwt.verify(tokenObject, code.secret, (err, decoded) => {
                if (err) {
                    return 'token verification failed';
                }

                return decoded;
            }); // ends verify
        } else {
            return 'no token';
        } // ends if statement
    }
}

export default Token;