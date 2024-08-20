const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({message: "Não autorizado"}); 
    }

    const parts = authHeader.split(' ');

    const token = parts[2];

    if(token == null){
        return res.status(401).json({message: "Acesso negado. Token Inválido ou vazio"}); 
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = authenticateToken;