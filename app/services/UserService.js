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

    async updatePassword(uuid,newPassword){
        return await this.UserRepository.updatePassword(uuid,newPassword);
    }

    async delete(uuid){
        return await this.UserRepository.delete(uuid);
    }

    async findByEmail(email){
        return await this.UserRepository.findByEmail(email);
    }

    async updateToken(token,email){
        return await this.UserRepository.updateToken(token,email);
    }
}