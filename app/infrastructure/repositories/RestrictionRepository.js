const Restriction = require('../../domain/models/Restriction');

module.exports = class RestrictionRepository{
    async create(data){
        return await Restriction.create(data);
    }

    async findByUuid(uuid){
        return await Restriction.findByPk(uuid);
    }

    async findAll(){
        return await Restriction.findAll();
    }

    async update(uuid,data){
        return await Restriction.update(data,{
            where:{
                id: uuid
            }
        })
    }

    async delete(uuid){
        return await Restriction.destroy({
            where:{
                id: uuid
            }
        });
    }

    async typeNameExists(name){
        return await Restriction.findOne({
            where: {
                type_name: name
            }
        });
    }
}