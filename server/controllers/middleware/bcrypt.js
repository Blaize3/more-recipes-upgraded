import bcrypt from 'bcrypt';

class securePassword {
    static encryptPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    static decryptPassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

export default securePassword;