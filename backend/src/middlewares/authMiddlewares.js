import jwt from 'jsonwebtoken';
import models from '../models/index';

export const isLoggedIn = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ message: 'لم يتم توفير رمز الدخول token.' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if (err)
            return res.status(500).json({ err: err.message });
        req.currentUser = decodedData;
        next();
    });
}