const OwnerService = require('../../application/services/OwnerService');
const { validateFormatUUID } = require('../../infrastructure/utils/validationUUID');
const { validateEmail } = require('../../infrastructure/utils/validationEmail');

const { validateLength } = require('../../infrastructure/utils/validationLength');
const { validateEmpty } = require('../../infrastructure/utils/validationEmpty');

module.exports = class OwnerUseCase{
    constructor(){
        this.OwnerService = new OwnerService();
    }

    async findAllOwners(res){
        const owners = await this.OwnerService.findAll();

        if(owners.length === 0){
            return res.status(404).json({message: "Nenhum  registro encontrado"});    
        }
        return owners;
    }

    async getOwnerByUUID(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const owner = await this.OwnerService.getByUUID(uuid);
        
        if(owner === null){
            return res.status(404).json({message: "Dono não encontrado"});
        }

        return owner;
    }

    async createOwner(req,res){
        const { first_name, last_name, cpf, email, phone } = req.body;
    
        validateEmail(res,email);
        if (res.headersSent) return;
        validateLength(res,first_name,last_name,cpf,phone);
        if (res.headersSent) return;
        validateEmpty(res,first_name,email,phone,cpf);
        if (res.headersSent) return;

        const existsOwner = await this.OwnerService.cpfExists(cpf);
        
        if(existsOwner){
            return res.status(409).json({message: "CPF já cadastrado"});
        }

        const createdOwner = this.OwnerService.create(req.body);
        return createdOwner;
    }

    async updateOwner(req,res){
        const { first_name, last_name, cpf, email, phone } = req.body;
    
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        await this.OwnerService.getByUUID(uuid);
    
        validateEmail(res,email);
        if (res.headersSent) return;
        validateLength(res,first_name,last_name,cpf,phone);
        if (res.headersSent) return;
        validateEmpty(res,first_name,email,phone,cpf);
        if (res.headersSent) return;

        const updatedOwner = await this.OwnerService.update(uuid,req.body);

        if(!updatedOwner){
            return res.status(500).json({message: "Falha ao tentar atualizar"});
        }
        return updatedOwner;
    }

    async deleteOwner(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        await this.OwnerService.getByUUID(uuid);

        const owner = await this.OwnerService.delete(uuid);

        if(!owner){
            return res.status(404).json({message: "Dono não encontrado"});
        }
        return owner;
    }
}