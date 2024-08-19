const UserService = require('../../application/services/UserService');
const { validateFormatUUID } = require('../../infrastructure/utils/validationUUID');
const { validateEmail } = require('../../infrastructure/utils/validationEmail');
const { validateRequestLengthInCreate,validateRequestLength } = require('../../infrastructure/utils/validationLength');
const { validateRequestEmptyInCreate,validateRequestEmptyInUpdate } = require('../../infrastructure/utils/validationEmpty');
const { validatePasswordEmptyOrNull,validatePasswordLength } = require('../../infrastructure/utils/validationPassword');

const bcrypt = require('bcrypt');

//o quano torna imprevisivel
const salt = bcrypt.genSaltSync(10);

module.exports = class UserUseCase{
    constructor(){
        this.UserService = new UserService();
    }

    async findAllUsers(res){
        const users = await this.UserService.findAll();

        if(users.length === 0){
            return res.status(404).json({message: "Nenhum registro encontrado"});    
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

    async createUser(req,res){
        const { first_name, last_name, email, phone, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password,salt);
        
        const data = {
            first_name,
            last_name,
            email,
            phone,
            password: encryptedPassword
        };
    
        validateRequestEmptyInCreate(res,first_name,email,password);
        if(res.headersSent) return;
        validateEmail(res,email);
        if(res.headersSent) return;
        validateRequestLengthInCreate(res,first_name,last_name,phone,password);
        if(res.headersSent) return;

        return await this.UserService.create(data);
    }

    async updateUser(req,res){
        const { first_name, last_name, email, phone } = req.body;
    
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        await this.findUserByUUID(req,res);
    
        validateEmail(res,email);
        if(res.headersSent) return;
        validateRequestLength(res,first_name,last_name,phone);
        if(res.headersSent) return;
        validateRequestEmptyInUpdate(res,first_name,email);
        if(res.headersSent) return;

        const updatedUser = await this.UserService.update(uuid,req.body);

        if(!updatedUser){
            return res.status(500).json({message:"Houve falha ao tentar atualizar"});
        }

        return updatedUser;
    }

    async updatePassword(req,res){
        const uuid = req.params.uuid;
        const newPassword = req.body.password;

        await this.findUserByUUID(req,res);

        validatePasswordEmptyOrNull(res,newPassword);
        if(res.headersSent) return;
        validatePasswordLength(res,newPassword);
        if(res.headersSent) return;

        const updatePassword = await this.UserService.updatePassword(uuid,newPassword);

        if(!updatePassword){
            return res.status(500).json({message: "Houve falha ao tentar atualizar senha"});
        }

        return updatePassword;
    }

    async deleteUser(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        await this.findUserByUUID(req,res);

        return this.UserService.delete(uuid);
    }
}