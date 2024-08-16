const DogService = require('../services/DogService');
const { validationYearDog } = require('../utils/validationYearDog');
const { validationPostage } = require('../utils/validationPostage');
const { validateFormatUUID } = require('../utils/validationUUID');
const { validateDogLength } = require('../utils/validationDogLength');
const { validateDogEmpty } = require('../utils/validationDogEmpty');
const OwnerService = require('../services/OwnerService');

module.exports = class DogUseCase{
    constructor(){
        this.DogService = new DogService();
        this.OwnerService = new OwnerService();
    }

    async listDogs(res){
        const dogs = this.DogService.findAll();

        if(dogs.length === 0){
            return res.status(404).json({message: "Nenhum registro encontrado"});
        }
        return dogs;
    }

    async getDogByUUID(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const dog = this.DogService.getByUUID(uuid);

        if(dog.length === 0){
            return res.status(404).json({message: "Registro não encontrado"});
        }
        return dog;
    }

    async createDog(req,res){
        const { name, year, color, postage, race, deficiency, owners } = req.body;

        validationYearDog(res,year);
        if (res.headersSent) return;
        validationPostage(res,postage);
        if (res.headersSent) return;
        validateDogLength(res,name,color,race);
        if (res.headersSent) return;
        validateDogEmpty(res,name,color,year,postage,deficiency);
        if (res.headersSent) return;

        let listOwner = [];
        for (let i = 0; i < owners.length; i++) {
            let ownerId = owners[i];

            validateFormatUUID(res,ownerId);
            if (res.headersSent) return;

            try {
                let ownerExists = await this.OwnerService.getByUUID(ownerId);
                
                if(!ownerExists){
                    listOwner.push(ownerId);
                }
            } catch (error) {
                console.log("Erro ao verificar o dono: " + ownerId);
            }
        }

        if (listOwner.length > 0) {
            return res.status(400).json({
                error: `Os seguintes IDs de donos são inválidos: ${listOwner.join(', ')}`
            });
        }

        const createdDog = await this.DogService.create(req.body);

        return createdDog;
    }

    async updateDog(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const { name, year, color, postage, race, deficiency, owners } = req.body;
    
        validationYearDog(res,year);
        if (res.headersSent) return;
        validationPostage(res,postage);
        if (res.headersSent) return;
        validateDogLength(res,name,color,race);
        if (res.headersSent) return;
        validateDogEmpty(res,name,color,year,postage,deficiency);
        if (res.headersSent) return;

        let listOwner = [];
        for (let i = 0; i < owners.length; i++) {
            let ownerId = owners[i];

            validateFormatUUID(res,ownerId);
            if (res.headersSent) return;
            
            try {
                let ownerExists = await this.OwnerService.getByUUID(ownerId);
                
                if(!ownerExists){
                    listOwner.push(ownerId);
                }
            } catch (error) {
                console.log("Erro ao verificar o dono: " + ownerId);
            }
        }

        if (listOwner.length > 0) {
            return res.status(400).json({
                error: `Os seguintes IDs de donos são inválidos: ${listOwner.join(', ')}`
            });
        }

        const updatedDog = await this.DogService.update(uuid,req.body);

        if(!updatedDog){
            return res.status(400).json({message: "Houve falha ao tentar atualizar"});
        }

        return updatedDog;
    }

    async deleteDog(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const dog = await this.DogService.delete(uuid);
        
        if(!dog){
            return res.status(500).json({message: "Houve falha ao tentar deletar"});
        }
        return dog;
    }
}