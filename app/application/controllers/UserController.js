const UserUseCase = require('../../domain/usecases/UserUseCase');

module.exports = class UserController{
    constructor(){
        this.UserUseCase = new UserUseCase();
    }

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Lista todos os usuários
     *     tags: [User]
     *     security: 
     *       - bearerAuth: []
     *     responses: 
     *       200:
     *         description: Usuários listados
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
     *                   first_name:
     *                     type: string
     *                   last_name:
     *                     type: string
     *                     description: Campo opcional
     *                   email: 
     *                     type: string
     *                   phone:
     *                     type: string
     *                     description: Campo opcional
     *                   createdAt:
     *                     type: string
     *                     format: timestamp
     *                   updatedAt:
     *                     type: string
     *                     format: timestamp
     *       401:
     *         description: Não autorizado
     *       403:
     *         description: Acesso negado
     *       404:
     *         description: Nenhum registro encontrado
     *
     */
    async listUsers (req,res) {
        try{
            const users = await this.UserUseCase.findAllUsers(res);
    
            res.status(200).json({users: users});
        }catch(error){
            console.log("Erro: " + error);
        }
    };
    
    /**
     * @swagger
     * /users/{uuid}:
     *   get:
     *     summary: Retorna um usuário por UUID
     *     tags: [User]
     *     parameters:
     *       - name: uuid
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     security: 
     *       - bearerAuth: []
     *     responses: 
     *       200:
     *         description: Usuário encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   format: uuid
     *                 first_name:
     *                   type: string
     *                 last_name:
     *                   type: string
     *                   description: Campo opcional
     *                 email: 
     *                   type: string
     *                 phone:
     *                   type: string
     *                   description: Campo opcional
     *                 createdAt:
     *                   type: string
     *                   format: timestamp
     *                 updatedAt:
     *                   type: string
     *                   format: timestamp
     *       401:
     *         description: Não autorizado
     *       403:
     *         description: Acesso negado
     *       404:
     *         description: Nenhum usuário encontrado
     */
    async getUserByUUID(req,res) {
        try{
            const user = await this.UserUseCase.findUserByUUID(req,res);
    
            return res.status(200).json({user: user});
        }catch(error){
            console.log("Erro: "+error);
        }
    }
    
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Cria um novo Usuário
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               first_name:
     *                 type: string
     *               last_name:
     *                 type: string
     *                 description: Campo opcional
     *               email:
     *                 type: string
     *               phone:
     *                 type: string
     *                 description: Campo opcional
     *               password:
     *                 type: string
     *               token: 
     *                 type: string
     *                 description: Campo opcional
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *       400:
     *         description: Campos obrigatórios vazios | Email inválido | Senha deve conter entre 8 e 32 caracteres 
     *       401:
     *         description: Token não fornecido ou inválido
     *       403: 
     *         description: Acesso negado
     */
    async createUser(req,res) {
        try{
            const user = await this.UserUseCase.createUser(req,res);
            return res.status(201).json({message:"Usuário criado com sucesso",user: user});
        }catch(error){
            console.log(error);
        }
    };
    
    /**
     * @swagger
     * /users/{uuid}:
     *   patch:
     *     summary: Atualiza um usuário existente
     *     tags: [User]
     *     parameters:
     *       - name: uuid
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               first_name:
     *                 type: string
     *               last_name:
     *                 type: string
     *                 description: Campo opcional
     *               email:
     *                 type: string
     *               phone:
     *                 type: string
     *                 description: Campo opcional
     *               password:
     *                 type: string
     *               token: 
     *                 type: string
     *                 description: Campo opcional
     *     responses:
     *       200:
     *         description: Usuário atualizado com sucesso
     *       400:
     *         description: Campos obrigatórios vazios | Email inválido | Senha deve conter entre 8 e 32 caracteres 
     *       401:
     *         description: Token não fornecido ou inválido
     *       403: 
     *         description: Acesso negado
     *       404: 
     *         description: Usuário não encontrado
     */
    async updateUser(req,res) {
        try{
            await this.UserUseCase.updateUser(req,res);
    
            return res.status(200).json({message: "Usuário atualizado com sucesso"});
        }catch(error){
            console.log("Erro: " + error.message);
        }
    };

    /**
     * @swagger
     * /users/updatePassword/{uuid}:
     *   patch:
     *     summary: Atualiza a senha de um usuário existente
     *     tags: [User]
     *     parameters:
     *       - name: uuid
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Senha atualizada com sucesso
     *       400:
     *         description: Senha inválida | Senha deve conter entre 8 e 32 caracteres 
     *       401:
     *         description: Token não fornecido ou inválido
     *       403: 
     *         description: Acesso negado
     *       404: 
     *         description: Usuário não encontrado
     */
    async updatePassword(req,res) {
        try{
            await this.UserUseCase.updatePassword(req,res);
            return res.status(200).json({message: "Senha atualizada com sucesso"});
        }catch(error){
            console.log("Erro: " + error);
        }
    }
    
    /**
     * @swagger
     * /users/{uuid}:
     *   delete:
     *     summary: Deleta um usuário existente
     *     tags: [User]
     *     parameters:
     *       - name: uuid
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     security: 
     *       - bearerAuth: []
     *     responses:
     *       204:
     *         description: Usuário deletado com sucesso
     *       401:
     *         description: Token não fornecido ou inválido
     *       403: 
     *         description: Acesso negado
     *       404: 
     *         description: Usuário não encontrado
     */
    async deleteUser(req,res) {
        try{
            await this.UserUseCase.deleteUser(req,res);
    
            return res.status(204).send();
        }catch(error){
            console.log("Erro: " + error);
        }
    };   
}