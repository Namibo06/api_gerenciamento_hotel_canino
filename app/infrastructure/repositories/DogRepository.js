const Dog = require("../../domain/models/Dog");
const Restriction = require("../../domain/models/Restriction");
const Owner = require("../../domain/models/Owner");
const { sequelize } = require("../config/Database");

module.exports = class DogRepository{
    async findAll(){
        const dogs = await Dog.findAll({
            include: {
                model: Owner,
                as: 'dogOwners',
               /* through: {
                    attributes: []  // Opcional: se você não quiser retornar os dados da tabela de junção
                }*/
            }
        });
        return dogs;
    }

    async getByUUID(uuid){
        console.log(uuid);
        return await Dog.findOne({
            where:{
                id: uuid
            },
            include: {
                model: Owner,
                as: 'dogOwners',
            }
        });
    }

    async create(dog, ownersCpf, restrictionsName) {
        return await sequelize.transaction(async (t) => {
            const createDog = await Dog.create(dog, {
                transaction: t
            });
    
            if (ownersCpf && ownersCpf.length > 0) {
                const ownersInstances = await Owner.findAll({
                    where: {
                        cpf: ownersCpf,
                    },
                    transaction: t
                });
                await createDog.setDogOwners(ownersInstances, {
                    transaction: t
                });
            }

            if (restrictionsName && restrictionsName.length > 0) {
                const restrictionsInstances = await Restriction.findAll({
                    where: { type_name: restrictionsName },
                    transaction: t
                });
                await createDog.setDogRestrictions(restrictionsInstances, { 
                    transaction: t 
                });
            }

            return createDog;
        });
    }

    async update(uuid,dog, ownersCpf, restrictionsName){
        return await sequelize.transaction(async (t) => {
            // Primeiro, encontre a instância do cachorro
            const updateDog = await Dog.findByPk(uuid, { transaction: t });
    
            if (!updateDog) {
                throw new Error('Cachorro não encontrado');
            }
    
            // Em seguida, atualize a instância do cachorro
            await updateDog.update(dog, { transaction: t });
    
            // Se ownersCpf estiver definido, atualize os donos
            if (ownersCpf && ownersCpf.length > 0) {
                const ownersInstances = await Owner.findAll({
                    where: {
                        cpf: ownersCpf,
                    },
                    transaction: t
                });
                await updateDog.setDogOwners(ownersInstances, {
                    transaction: t
                });
            }
    
            // Se restrictionsName estiver definido, atualize as restrições
            if (restrictionsName && restrictionsName.length > 0) {
                const restrictionsInstances = await Restriction.findAll({
                    where: { type_name: restrictionsName },
                    transaction: t
                });
                await updateDog.setDogRestrictions(restrictionsInstances, { 
                    transaction: t 
                });
            } else {
                await updateDog.setDogRestrictions([], { 
                    transaction: t 
                });
            }
    
            return updateDog;
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