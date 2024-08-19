const User = require('../../domain/models/User');
const sequelize = require('../config/Database');

module.exports = class UserRepository{
    async findAll(){
        return await User.findAll({
            attributes: ["id","first_name","last_name","email","phone","createdAt","updatedAt"]
        });
    }

    async findByUUID(uuid){
        return await User.findByPk(uuid,{
            attributes: ["id","first_name","last_name","email","phone","token","createdAt","updatedAt"]
        });
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

    async updatePassword(uuid,newPassword){
        return await User.update({password: newPassword},{
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

    async findByEmail(email){
        return await User.findOne({
            where:{
                email: email
            }
        });
    }

    async updateToken(token,email){
        return await User.update({token: token},{
            where:{
                email: email
            }
        });
    }
}