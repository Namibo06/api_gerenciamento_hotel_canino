const User = require('../models/User');

module.exports = class UserRepository{
    async findAll(){
        return await User.findAll();
    }

    async findByUUID(uuid){
        return await User.findByPk(uuid);
    }

    async create(user){
        return await User.create(user);
    }

    async update(uuid,user){
        return await User.update(user,{
            where:{
                id:uuid
            }
        });
    }

    async delete(uuid){
        return await User.destroy({
            where:{
                id:uuid
            }
        });
    }
}