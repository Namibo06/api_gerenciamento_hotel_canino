const User = require('../models/User');


const UserUseCase = require('../usecases/UserUseCase');

module.exports = class UserController{
    constructor(){
        this.UserUseCase = new UserUseCase();
    }

    async listUsers (req,res) {
        try{
            const users = await this.UserUseCase.findAllUsers(res);
    
            res.status(200).json({users: users});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async getUserByUUID(req,res) {
        try{
            const user = await this.UserUseCase.findUserByUUID(req,res);
    
            return res.status(200).json({user: user});
        }catch(error){
            console.log("Erro: "+error);
        }
    }
    
    async createUser(req,res) {
        try{
            const user = await this.UserUseCase.createUser(req,res);
            return res.status(201).json({message:"Usuário criado com sucesso",user: user});
        }catch(error){
            console.log(error);
        }
    };
    
    async updateUser(req,res) {
        try{
            await this.UserUseCase.updateUser(req,res);
    
            return res.status(200).json({message: "Usuário atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error.message);
        }
    };

    async updatePassword(req,res) {
        try{
            await this.UserUseCase.updatePassword(req,res);
            return res.status(200).json({message: "Senha atualizada com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    async deleteUser(req,res) {
        try{
            await this.UserUseCase.deleteUser(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro: " + error);
        }
    };   
}