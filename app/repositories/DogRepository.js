const Dog = require("../models/Dog")

module.exports = class DogRepository{
    async findAll(){
        return await Dog.findAll();
    }

    async getByUUID(uuid){
        return await Dog.findByPk(uuid);
    }

    async create(dog){
        return await Dog.create(dog);
    }

    async update(uuid,dog){
        return await Dog.update(dog,{
            where:{
                id:uuid
            }
        });
    }

    async delete(uuid){
        return await Dog.destroy({
            where:{
                id:uuid
            }
        });
    }
}