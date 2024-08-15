const UserService = require('../services/UserService');
const { validateFormatUUID } = require('../utils/validationUUID');
const { validateEmail } = require('../utils/validationEmail');
const { validateRequestLengthInCreate,validateRequestLength } = require('../utils/validationLength');
const { validateRequestEmptyInCreate,validateRequestEmptyInUpdate } = require('../utils/validationEmpty');

module.exports = class UserUseCase{
    constructor(){
        this.UserService = new UserService();
    }

    async findAllUsers(res){
        const users = await this.UserService.findAll();

        if(users.length === 0){
            return res.status(404).json({message: "Nenhum  registro encontrado"});    
        }
        return users;
    }

    async findUserByUUID(req,res){  
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        const user = await this.UserService.findByUUID(uuid);

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        return user;
    }

    async createUser(res,user){
        const { first_name, last_name, email, phone, password } = user;
    
        validateRequestEmptyInCreate(res,first_name,email,password);
        if(res.headersSent) return;
        validateEmail(res,email);
        if(res.headersSent) return;
        validateRequestLengthInCreate(res,first_name,last_name,phone,password);
        if(res.headersSent) return;

        const createdUser = await this.UserService.create(user);
        return createdUser;
    }

    async updateUser(req,res){
        const { first_name, last_name, email, phone } = req.body;
    
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;
    
        validateEmail(res,email);
        if(res.headersSent) return;
        validateRequestLength(res,first_name,last_name,phone);
        if(res.headersSent) return;
        validateRequestEmptyInUpdate(res,first_name,email);
        if(res.headersSent) return;

        const updatedUser = await this.UserService.update(uuid,req.body);

        if(!updatedUser){
            return res.status(400).json({message:"Houve falha ao tentar atualizar"});
        }

        return updatedUser;
    }

    async deleteUser(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        const user = this.UserService.delete(uuid);

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        return user;
    }
}