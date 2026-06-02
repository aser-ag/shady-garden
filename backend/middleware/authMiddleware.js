import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json( {message: "Not authorized: missing header or malformed token"} );
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json( {message: "User no longer exists"} );
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json( {message: "Unauthorized access"} );
    }

};

export default protect;