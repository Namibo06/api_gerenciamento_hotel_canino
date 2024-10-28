const RestrictionUseCase = require('../../domain/usecases/RestrictionUseCase');

module.exports = class RestrictionController{
    constructor(){
        this.RestrictionUseCase = new RestrictionUseCase();
    }

    async createRestriction(req,res){
        try{
            const restriction = await this.RestrictionUseCase.createRestriction(req,res);

            return res.status(201).json({
                "message":"Restrição criada",
                "restriction":restriction,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    async findAllRestrictions(req,res){
        try{
            const restrictions = await this.RestrictionUseCase.findAllRestrictions(req,res);

            return res.status(200).json({
                "message":"Restrição(ões) encontrada(s)",
                "restriction":restrictions,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    async findRestrictionByUuid(req,res){
        try{
            const restriction = await this.RestrictionUseCase.findRestrictionByUuid(req,res);

            return res.status(200).json({
                "message":"Restrição encontrada",
                "restriction":restriction,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    async updateRestriction(req,res){
        try{
            await this.RestrictionUseCase.updateRestriction(req,res);

            return res.status(200).json({
                "message":"Restrição atualizada"
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    async deleteRestriction(req,res){
        try{
            await this.RestrictionUseCase.deleteRestriction(req,res);

            return res.status(204).send();
        }catch(error){
            console.log("Erro: "+ error);
        }
    }
}