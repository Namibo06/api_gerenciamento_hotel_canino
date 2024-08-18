const DogUseCase = require('../../domain/usecases/DogUseCase');

module.exports = class DogController{
    constructor(){
        this.DogUseCase = new DogUseCase();
    }

    async listDogs(req,res) {
        try{
            const dogs = await this.DogUseCase.listDogs(res);
    
            return res.status(200).json({dogs: dogs});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    async getDogByUUID(req,res) {
        try{
            const dog = await this.DogUseCase.getDogByUUID(req,res);
    
            return res.status(200).json({dog: dog});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    async createDog(req,res) {
        try{
            const dog = await this.DogUseCase.createDog(req,res);

            return res.status(201).json({dog: dog});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    async updateDog(req,res) {
        try{
            await this.DogUseCase.updateDog(req,res);
    
            return res.status(200).json({message: "Registro atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    async deleteDog(req,res) {
        try{
            await this.DogUseCase.deleteDog(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro:"  + error);
        }
    }
}