const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;
