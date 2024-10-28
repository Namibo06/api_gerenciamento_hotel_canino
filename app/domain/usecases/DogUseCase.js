const DogService = require('../../application/services/DogService');
const { validationYearDog } = require('../../infrastructure/utils/validationYearDog');
const { validationPostage } = require('../../infrastructure/utils/validationPostage');
const { validateFormatUUID } = require('../../infrastructure/utils/validationUUID');
const { validateDogLength } = require('../../infrastructure/utils/validationDogLength');
const { validateDogEmpty } = require('../../infrastructure/utils/validationDogEmpty');
const OwnerService = require('../../application/services/OwnerService');
const RestrictionService = require('../../application/services/RestrictionService');

module.exports = class DogUseCase{
    constructor(){
        this.DogService = new DogService();
        this.OwnerService = new OwnerService();
        this.RestrictionService = new RestrictionService();
    }

    async listDogs(res){
        const dogs = await this.DogService.findAll();

        if(dogs.length === 0){
            return res.status(404).json({message: "Nenhum registro encontrado"});
        }
        return dogs;
    }

    async getDogByUUID(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const dog = await this.DogService.getByUUID(uuid);
        
        if(dog === null){
            return res.status(404).json({message: "Cachorro não encontrado"});
        }
        return dog;
    }

    async createDog(req,res){
        const { name, year, color, postage, race, deficiency, ownersCpf, restrictionsName  } = req.body;

        validationYearDog(res,year);
        if (res.headersSent) return;
        validationPostage(res,postage);
        if (res.headersSent) return;
        validateDogLength(res,name,color,race);
        if (res.headersSent) return;
        validateDogEmpty(res,name,color,year,postage,deficiency);
        if (res.headersSent) return;

        if (!ownersCpf || !Array.isArray(ownersCpf) || ownersCpf.length === 0) {
            return res.status(400).json({
                error: "O campo 'ownersCpf' é obrigatório e não pode ser vazio."
            });
        }

        //validando owners
        let listOwner = [];
        for (let i = 0; i < ownersCpf.length; i++) {
            let owner = ownersCpf[i];

            try {
                let ownerExists = await this.OwnerService.cpfExists(owner);
                
                if(!ownerExists){
                    listOwner.push(owner);
                }
            } catch (error) {
                console.log("Erro ao verificar o dono: " + owner);
            }
        }

        if (listOwner.length > 0) {
            return res.status(400).json({
                error: `Os seguintes CPF's de donos são inválidos: ${listOwner.join(', ')}`
            });
        }

        //validando restrictions
        let listRestrictions = [];
        for (let i = 0; i < restrictionsName.length; i++) {
            let restriction = restrictionsName[i];

            try {
                let restrictionExists = await this.RestrictionService.typeNameExists(restriction);
                
                if (!restrictionExists) {
                    listRestrictions.push(restriction);
                }
            } catch (error) {
                console.log("Erro ao verificar a restrição: " + restriction);
            }
        }

        if (listRestrictions.length > 0) {
            return res.status(400).json({
                error: `As seguintes restrições são inválidas: ${listRestrictions.join(', ')}`
            });
        }

        return await this.DogService.create(req.body,ownersCpf,restrictionsName);
    }

    async updateDog(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;

        const existsDog = await this.DogService.getByUUID(uuid);
        if(!existsDog){
            return res.status(404).send({message:"Cachorro não encontrado"});
        }
        
        const { name, year, color, postage, race, deficiency, ownersCpf, restrictionsName  } = req.body;

        console.log("cpf="+ownersCpf);
        console.log("name="+restrictionsName);

        validationYearDog(res,year);
        if (res.headersSent) return;
        validationPostage(res,postage);
        if (res.headersSent) return;
        validateDogLength(res,name,color,race);
        if (res.headersSent) return;
        validateDogEmpty(res,name,color,year,postage,deficiency);
        if (res.headersSent) return;

        if (!ownersCpf || !Array.isArray(ownersCpf) || ownersCpf.length === 0) {
            return res.status(400).json({
                error: "O campo 'ownersCpf' é obrigatório e não pode ser vazio."
            });
        }

        //validando owners
        let listOwner = [];
        for (let i = 0; i < ownersCpf.length; i++) {
            let owner = ownersCpf[i];

            try {
                let ownerExists = await this.OwnerService.cpfExists(owner);
                
                if(!ownerExists){
                    listOwner.push(owner);
                }
            } catch (error) {
                console.log("Erro ao verificar o dono: " + owner);
            }
        }

        if (listOwner.length > 0) {
            return res.status(400).json({
                error: `Os seguintes CPF's de donos são inválidos: ${listOwner.join(', ')}`
            });
        }

        //validando restrictions
        let listRestrictions = [];
        for (let i = 0; i < restrictionsName.length; i++) {
            let restriction = restrictionsName[i];

            try {
                let restrictionExists = await this.RestrictionService.typeNameExists(restriction);
                
                if (!restrictionExists) {
                    listRestrictions.push(restriction);
                }
            } catch (error) {
                console.log("Erro ao verificar a restrição: " + restriction);
            }
        }

        if (listRestrictions.length > 0) {
            return res.status(400).json({
                error: `As seguintes restrições são inválidas: ${listRestrictions.join(', ')}`
            });
        }

        const updatedDog = await this.DogService.update(uuid,req.body,ownersCpf,restrictionsName);

        if(!updatedDog){
            return res.status(400).json({message: "Houve falha ao tentar atualizar"});
        }

        return updatedDog;
    }

    async deleteDog(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if (res.headersSent) return;
        
        await this.getDogByUUID(req,res);

        const dog = await this.DogService.delete(uuid);
        
        if(!dog){
            return res.status(500).json({message: "Houve falha ao tentar deletar"});
        }
        return dog;
    }
}