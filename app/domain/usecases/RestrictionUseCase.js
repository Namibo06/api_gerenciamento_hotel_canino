const RestrictionService = require('../../application/services/RestrictionService');
const { validateTypeNameRestrictionLength } = require('../../infrastructure/utils/validationLength');
const { validateRestriction } = require('../../infrastructure/utils/validationEmpty');
const { validateFormatUUID } = require('../../infrastructure/utils/validationUUID');

module.exports = class RestrictionUseCase{
    constructor(){
        this.RestrictionService = new RestrictionService();
    }

    async createRestriction(req,res){
        const { type_name, description } = req.body;

        const data = {
            type_name,
            description
        };

        validateTypeNameRestrictionLength(res,type_name);
        if(res.headersSent) return;
        validateRestriction(res,type_name,description);
        if(res.headersSent) return;

        return await this.RestrictionService.create(data);
    }

    async findAllRestrictions(req,res){
    
        const restrictions = await this.RestrictionService.findAll();

        if(restrictions.length === 0){
            return res.status(404).json({message: "Restrições não encontradas"});
        }

        return restrictions;
    }

    async findRestrictionByUuid(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;
    
        const restriction = await this.RestrictionService.findByUuid(uuid);

        if(!restriction){
            return res.status(404).json({message: "Restrição não encontrada"});
        }

        return restriction;
    }

    async updateRestriction(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;

        const { type_name, description } = req.body;

        const data = {
            type_name,
            description
        };

        validateTypeNameRestrictionLength(res,type_name);
        if(res.headersSent) return;
        validateRestriction(res,type_name,description);
        if(res.headersSent) return;

        const updatedRestriction = await this.RestrictionService.update(uuid,data);

        if(!updatedRestriction){
            return res.status(500).message({message: "Houve uma falha ao tentar atualizar!"});
        }

        return updatedRestriction;
    }

    async deleteRestriction(req,res){
        const uuid = req.params.uuid;
        validateFormatUUID(res,uuid);
        if(res.headersSent) return;
    
        await this.findRestrictionByUuid(req,res);

        return this.RestrictionService.delete(uuid);
    }
}