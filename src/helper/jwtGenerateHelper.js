import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    generateAccessJWT: (data) => {
        let token = '';
        token = jwt.sign(
            { userId: data.userId, email: data.email },
            process.env.MY_SECRET,
            { expiresIn:  process.env.TOKEN_EXPIRES_IN }
        );
        return token;
    }
}