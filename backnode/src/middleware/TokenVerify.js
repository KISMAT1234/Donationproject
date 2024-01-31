import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class TokenVerify {
    static verifyToken(token) {
        let response = false;
        try {
            response = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            response = false;
        }
        return response;
    }
}

export default TokenVerify;