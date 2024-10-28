const RestrictionUseCase = require('../../domain/usecases/RestrictionUseCase');

module.exports = class RestrictionController{
    constructor(){
        this.RestrictionUseCase = new RestrictionUseCase();
    }

       /**
 * @swagger
 * tags:
 *   name: Restrictions
 *   description: API para gerenciamento de restrições
 */

       /**
 * @swagger
 * /restrictions/:
 *   post:
 *     summary: Cria uma nova restrição
 *     tags: [Restrictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restrição criada
 *                 restriction:
 *                   $ref: '#/components/schemas/Restriction'
 */

    async createRestriction(req,res){
        try{
            const restriction = await this.RestrictionUseCase.createRestriction(req,res);

            return res.status(201).json({
                "message":"Restrição criada",
                "restriction":restriction,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

 

/**
 * @swagger
 * /restrictions/:
 *   get:
 *     summary: Retorna todas as restrições
 *     tags: [Restrictions]
 *     responses:
 *       200:
 *         description: Lista de restrições
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restrição(ões) encontrada(s)
 *                 restriction:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restriction'
 *       404:
 *         description: Nenhuma restrição encontrada
 */
    async findAllRestrictions(req,res){
        try{
            const restrictions = await this.RestrictionUseCase.findAllRestrictions(req,res);

            return res.status(200).json({
                "message":"Restrição(ões) encontrada(s)",
                "restriction":restrictions,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    /**
 * @swagger
 * /restrictions/{uuid}:
 *   get:
 *     summary: Retorna uma restrição pelo UUID
 *     tags: [Restrictions]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da restrição
 *     responses:
 *       200:
 *         description: Restrição encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restrição encontrada
 *                 restriction:
 *                   $ref: '#/components/schemas/Restriction'
 *       404:
 *         description: Restrição não encontrada
 */
    async findRestrictionByUuid(req,res){
        try{
            const restriction = await this.RestrictionUseCase.findRestrictionByUuid(req,res);

            return res.status(200).json({
                "message":"Restrição encontrada",
                "restriction":restriction,
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    /**
 * @swagger
 * /restrictions/{uuid}:
 *   put:
 *     summary: Atualiza uma restrição pelo UUID
 *     tags: [Restrictions]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da restrição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restrição atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restrição atualizada
 *       500:
 *         description: Falha ao tentar atualizar
 */
    async updateRestriction(req,res){
        try{
            await this.RestrictionUseCase.updateRestriction(req,res);

            return res.status(200).json({
                "message":"Restrição atualizada"
            });
        }catch(error){
            console.log("Erro: "+ error);
        }
    }

    /**
 * @swagger
 * /restrictions/{uuid}:
 *   delete:
 *     summary: Deleta uma restrição pelo UUID
 *     tags: [Restrictions]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da restrição
 *     responses:
 *       204:
 *         description: Restrição deletada com sucesso
 */
    async deleteRestriction(req,res){
        try{
            await this.RestrictionUseCase.deleteRestriction(req,res);

            return res.status(204).send();
        }catch(error){
            console.log("Erro: "+ error);
        }
    }
}