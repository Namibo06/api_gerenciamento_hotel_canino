const Dog = require("../../domain/models/Dog");
const owner = require("../../domain/models/Owner");
const Owner = require("../../domain/models/Owner");
const { sequelize } = require("../config/Database");

module.exports = class DogRepository{
    async findAll(){
        return await Dog.findAll();
    }

    async getByUUID(uuid){
        return await Dog.findByPk(uuid);
    }

    async create(dog, owners) {
        return await sequelize.transaction(async (t) => {
            const createDog = await Dog.create(dog, {
                transaction: t
            });
    
            if (owners && owners.length > 0) {
                const ownersInstances = await Owner.findAll({
                    where: {
                        id: owners,
                    },
                    transaction: t
                });
                await createDog.setDogOwners(ownersInstances, {
                    transaction: t
                });
            }
            return createDog;
        });
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