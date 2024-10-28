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

    async create(dog,owners,restrictions){
        return await this.DogRepository.create(dog,owners,restrictions);
    }

    async update(uuid,dog,owners,restrictions){
        return await this.DogRepository.update(uuid,dog,owners,restrictions);
    }

    async delete(uuid){
        return await this.DogRepository.delete(uuid);
    }
}