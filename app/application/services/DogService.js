const DogRepository = require('../../infrastructure/repositories/DogRepository');

module.exports = class DogService{
    constructor(){
        this.DogRepository = new DogRepository();
    }

    async findAll(){
        return await this.DogRepository.findAll();
    }

    async getByUUID(uuid){
        return await this.DogRepository.getByUUID(uuid);
    }

    async create(dog,owners){
        return await this.DogRepository.create(dog,owners);
    }

    async update(uuid,dog){
        return await this.DogRepository.update(uuid,dog);
    }

    async delete(uuid){
        return await this.DogRepository.delete(uuid);
    }
}