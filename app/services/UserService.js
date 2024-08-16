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

    async create(data){
        return await this.UserRepository.create(data);
    }

    async update(uuid,user){
        return await this.UserRepository.update(uuid,user);
    }

    async delete(uuid){
        return await this.UserRepository.delete(uuid);
    }

    async findByEmailAndPassword(email,password){
        return await this.UserRepository.findByEmailAndPassword(email,password);
    }

    async updateToken(token,email){
        return await this.UserRepository.updateToken(token,email);
    }
}