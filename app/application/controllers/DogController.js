const DogUseCase = require('../../domain/usecases/DogUseCase');

module.exports = class DogController{
    constructor(){
        this.DogUseCase = new DogUseCase();
    }

    /**
     * @swagger
     * /dogs/:
     *   get:
     *     summary: Lista todos os cães
     *     tags: [Dog]
     *     responses:
     *       200:
     *         description: Lista de cães recuperada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     format: uuid
     *                   name:
     *                     type: string
     *                   year:
     *                     type: integer
     *                   color:
     *                     type: string
     *                   race:
     *                     type: string
     *                   restrictions:
     *                     type: string
     *                   deficiency:
     *                     type: string
     *       404:
     *         description: Nenhum cão encontrado
     */
    async listDogs(req,res) {
        try{
            const dogs = await this.DogUseCase.listDogs(res);
    
            return res.status(200).json({dogs: dogs});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    /**
     * @swagger
     * /dogs/{uuid}:
     *   get:
     *     summary: Retorna um cão específico pelo UUID
     *     tags: [Dog]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do cão
     *     responses:
     *       200:
     *         description: Cão encontrado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   format: uuid
     *                 name:
     *                   type: string
     *                 year:
     *                   type: integer
     *                 color:
     *                   type: string
     *                 race:
     *                   type: string
     *                 restrictions:
     *                   type: string
     *                 deficiency:
     *                   type: string
     *       404:
     *         description: Cão não encontrado
     */
    async getDogByUUID(req,res) {
        try{
            const dog = await this.DogUseCase.getDogByUUID(req,res);
    
            return res.status(200).json({dog: dog});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /dogs/:
     *   post:
     *     summary: Cria um novo cão
     *     tags: [Dog]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               year:
     *                 type: integer
     *               color:
     *                 type: string
     *               race:
     *                 type: string
     *               restrictions:
     *                 type: string
     *               deficiency:
     *                 type: string
     *     responses:
     *       201:
     *         description: Cão criado com sucesso
     *       400:
     *         description: Requisição inválida (nome, ano ou raça faltando)
     */
    async createDog(req,res) {
        try{
            const dog = await this.DogUseCase.createDog(req,res);

            return res.status(201).json({dog: dog});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    /**
     * @swagger
     * /dogs/{uuid}:
     *   put:
     *     summary: Atualiza as informações de um cão
     *     tags: [Dog]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do cão a ser atualizado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               year:
     *                 type: integer
     *               color:
     *                 type: string
     *               race:
     *                 type: string
     *               restrictions:
     *                 type: string
     *               deficiency:
     *                 type: string
     *     responses:
     *       200:
     *         description: Cão atualizado com sucesso
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Cão não encontrado
     */
    async updateDog(req,res) {
        try{
            await this.DogUseCase.updateDog(req,res);
    
            return res.status(200).json({message: "Registro atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    /**
     * @swagger
     * /dogs/{uuid}:
     *   delete:
     *     summary: Deleta um cão
     *     tags: [Dog]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do cão a ser deletado
     *     responses:
     *       204:
     *         description: Cão deletado com sucesso
     *       404:
     *         description: Cão não encontrado
     */
    async deleteDog(req,res) {
        try{
            await this.DogUseCase.deleteDog(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro:"  + error);
        }
    }
}