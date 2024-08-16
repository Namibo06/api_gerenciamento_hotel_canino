const OwnerUseCase = require('../usecases/OwnerUseCase');

module.exports = class OwnerController{
    constructor(){
        this.OwnerUseCase = new OwnerUseCase();
    }

    async listOwners(req,res) {
        try{
            const owners = await this.OwnerUseCase.findAllOwners(res);
    
            return res.status(200).json({owners: owners});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async getOwnerByUUID(req,res) {
        try{    
            const owner = await this.OwnerUseCase.getOwnerByUUID(req,res);
            return res.status(200).json({owner: owner});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async createOwner(req,res) {
        try{
            const owner = await this.OwnerUseCase.createOwner(req,res);
            return res.status(201).json({message: "Dono cadastrado com sucesso",owner: owner});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async updateOwner(req,res) {
        try{
            await this.OwnerUseCase.updateOwner(req,res);
    
            return res.status(200).json({message: "Atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async deleteUser(req,res) {
        try{
            await this.OwnerUseCase.deleteOwner(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro: " + error);
        }
    };
}