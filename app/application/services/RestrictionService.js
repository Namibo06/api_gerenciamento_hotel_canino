const RestrictionRepository = require('../../infrastructure/repositories/RestrictionRepository');

module.exports = class RestrictionService{
    constructor(){
        this.RestrictionRepository = new RestrictionRepository();
    }

    async create(data){
        return await this.RestrictionRepository.create(data);
    }

    async findByUuid(uuid){
        return await this.RestrictionRepository.findByUuid(uuid);
    }

    async findAll(){
        return await this.RestrictionRepository.findAll();
    }

    async update(uuid,data){
        return await this.RestrictionRepository.update(uuid,data);
    }

    async delete(uuid){
        return await this.RestrictionRepository.delete(uuid);
    }

    async typeNameExists(name){
        return await this.RestrictionRepository.typeNameExists(name);
    }
}