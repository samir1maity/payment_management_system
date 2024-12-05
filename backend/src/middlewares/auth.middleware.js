const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    console.log('code reached here')
    const token = req.headers["authorization"];
    const decode = await jwt.verify(token, process.env.USER_JWT_SECRET);

    if (decode) {
        req.userId = decode.id;
        next()
    } else {
        res.status(403).json({
            msg: "you are not logged in",
            successful: false,
        });
    }
};

module.exports = authMiddleware