const Owner = require("../../domain/models/Owner")

module.exports = class UserRepository{
   async findAll(){
      return await Owner.findAll();
   } 

   async getByUUID(uuid){
      return await Owner.findByPk(uuid);
   }

   async create(owner){
      return await Owner.create(owner);
   }

   async update(uuid,owner){
      return await Owner.update(owner,{
         where:{
            id:uuid
         }
      });
   }

   async delete(uuid){
      return await Owner.destroy({
         where:{
            id:uuid
         }
      });
   }

   async emailExists(email){
      return await Owner.findOne({
         where: {email},
         attributes: ['id']
      });
   }

   async cpfExists(cpf){
      return await Owner.findOne({
         where: {
            cpf
         }
      });
   }
}