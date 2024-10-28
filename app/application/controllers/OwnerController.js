const OwnerUseCase = require('../../domain/usecases/OwnerUseCase');

module.exports = class OwnerController{
    constructor(){
        this.OwnerUseCase = new OwnerUseCase();
    }

    /**
     * @swagger
     * /owners/:
     *   get:
     *     summary: Lista todos os donos
     *     tags: [Owner]
     *     responses:
     *       200:
     *         description: Lista de donos recuperada com sucesso
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
     *                   email:
     *                     type: string
     *       404:
     *         description: Nenhum dono encontrado
     */
    async listOwners(req,res) {
        try{
            const owners = await this.OwnerUseCase.findAllOwners(res);
    
            return res.status(200).json({owners: owners});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /owners/{uuid}:
     *   get:
     *     summary: Retorna um dono específico pelo UUID
     *     tags: [Owner]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do dono
     *     responses:
     *       200:
     *         description: Dono encontrado com sucesso
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
     *                 email:
     *                   type: string
     *       404:
     *         description: Dono não encontrado
     */
    async getOwnerByUUID(req,res) {
        try{    
            const owner = await this.OwnerUseCase.getOwnerByUUID(req,res);
            return res.status(200).json({owner: owner});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /owners/:
     *   post:
     *     summary: Cria um novo dono
     *     tags: [Owner]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       201:
     *         description: Dono criado com sucesso
     *       400:
     *         description: Requisição inválida (nome ou e-mail faltando)
     */
    async createOwner(req,res) {
        try{
            const owner = await this.OwnerUseCase.createOwner(req,res);
            return res.status(201).json({message: "Dono cadastrado com sucesso",owner: owner});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /owners/{uuid}:
     *   put:
     *     summary: Atualiza as informações de um dono
     *     tags: [Owner]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do dono a ser atualizado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Dono atualizado com sucesso
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Dono não encontrado
     */
    async updateOwner(req,res) {
        try{
            await this.OwnerUseCase.updateOwner(req,res);
    
            return res.status(200).json({message: "Atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /owners/{uuid}:
     *   delete:
     *     summary: Deleta um dono
     *     tags: [Owner]
     *     parameters:
     *       - in: path
     *         name: uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID do dono a ser deletado
     *     responses:
     *       204:
     *         description: Dono deletado com sucesso
     *       404:
     *         description: Dono não encontrado
     */
    async deleteOwner(req,res) {
        try{
            await this.OwnerUseCase.deleteOwner(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro: " + error);
        }
    };
}