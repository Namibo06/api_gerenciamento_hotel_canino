const LoginUseCase = require('../usecases/LoginUseCase');

module.exports = class LoginController{
    constructor(){
        this.LoginUseCase = new LoginUseCase();
    }

    async authenticate(req,res){
        try{
            const token = await this.LoginUseCase.authenticate(req,res);

            return res.status(200).json({message: "Usuário autenticado",token: token});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
}