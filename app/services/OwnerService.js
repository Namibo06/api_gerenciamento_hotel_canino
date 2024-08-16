const OwnerRepository = require("../repositories/OwnerRepository")

module.exports = class OwnerService{
    constructor(){
        this.OwnerRepository = new OwnerRepository();
    }

    async findAll(){
        return await this.OwnerRepository.findAll();
    }

    async getByUUID(uuid){
        return await this.OwnerRepository.getByUUID(uuid);
    }

    async create(owner){
        return await this.OwnerRepository.create(owner);
    }

    async update(uuid,owner){
        return await this.OwnerRepository.update(uuid,owner);
    }

    async delete(uuid){
        return await this.OwnerRepository.delete(uuid);
    }

    async cpfExists(cpf){
        return await this.OwnerRepository.cpfExists(cpf);
    }
}