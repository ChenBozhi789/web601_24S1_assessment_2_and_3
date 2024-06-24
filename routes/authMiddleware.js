// Import middleware 'jsonwebtoken'
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_first_secret_key';

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // 从请求头中提取token

    // If not token
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // Decode the user information and store it in the req object
        req.user = decoded; 
        // Call next() to pass the request to the next middleware or processing function
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;