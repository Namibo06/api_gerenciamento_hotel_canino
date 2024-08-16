require('dotenv').config();
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const validateEmail = require('../utils/validationEmail');

module.exports = class LoginUseCase{
    constructor(){
        this.UserService = new UserService();
    }

    async authenticate(req,res){
        const { email, password } = req.body;

        validateEmail(res,email);
        if(res.headersSent) return;

        const login = await this.UserService.findByEmailAndPassword(email,password);

        if(!login){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        
        const token = jwt.sign(email,process.env.TOKEN_SECRET,{ expiresIn: '259200' }); //3 dias

        await this.UserService.updateToken(token,email);

        return token;
    }
}