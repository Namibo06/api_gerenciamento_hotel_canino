const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new Error("Não autorizado");
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 3 || parts[1] !== 'Bearer') {
        throw new Error("Não autorizado");
    }

    const token = parts[2];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "Acesso negado. Token Inválido"});
    }
}

module.exports = authenticateToken;