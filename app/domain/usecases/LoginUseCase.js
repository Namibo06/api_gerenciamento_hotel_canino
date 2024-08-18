require('dotenv').config();
const UserService = require('../../application/services/UserService');
const jwt = require('jsonwebtoken');
const { validateEmail } = require('../../infrastructure/utils/validationEmail');
const bcrypt = require('bcrypt');

module.exports = class LoginUseCase{
    constructor(){
        this.UserService = new UserService();
    }

    async authenticate(req,res){
        const { email, password } = req.body;

        validateEmail(res,email);
        if(res.headersSent) return;

        const login = await this.UserService.findByEmail(email);

        if(!login){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        const validatePassword = await bcrypt.compare(password,login.password);

        if(validatePassword === false){
            return res.status(400).json({message: "Senhas não batem"});
        }
        
        const token = jwt.sign({ email },process.env.TOKEN_SECRET,{ expiresIn: '3d' }); //3 dias

        await this.UserService.updateToken(token,email);

        return token;
    }

    async verifyToken(authHeader){
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
            return decoded; 
        } catch (err) {
            throw new Error('Token inválido');
        }
    }
}