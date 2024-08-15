const UserRepository = require('../repositories/UserRepository');

module.exports = class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async findAll(){
        return await this.UserRepository.findAll();
    }

    async findByUUID(uuid){
        return await this.UserRepository.findByUUID(uuid);
    }

    async create(){
        return await this.UserRepository.create(user);
    }

    async update(uuid,user){
        return await this.UserRepository.update(uuid,user);
    }

    async delete(uuid){
        return await this.UserRepository.delete(uuid);
    }
}