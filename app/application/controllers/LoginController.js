const LoginUseCase = require('../../domain/usecases/LoginUseCase');

module.exports = class LoginController{
    constructor(){
        this.LoginUseCase = new LoginUseCase();
    }

    /**
     * @swagger
     * /login/:
     *   post:
     *     summary: Autentica um usuário e retorna um token
     *     tags: [Login]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: O e-mail do usuário
     *               password:
     *                 type: string
     *                 description: A senha do usuário
     *     responses:
     *       200:
     *         description: Usuário autenticado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 token:
     *                   type: string
     *       400:
     *         description: Requisição inválida (e-mail ou senha faltando)
     *       401:
     *         description: Autenticação falhou (e-mail ou senha incorretos)
     */
    async authenticate(req,res){
        try{
            const token = await this.LoginUseCase.authenticate(req,res);

            return res.status(200).json({message: "Usuário autenticado",token: token});
        }catch(error){
            console.log("Erro: " + error);
        }
    }

    /**
     * @swagger
     * /verifyToken/:
     *   get:
     *     summary: Verifica a validade de um token JWT
     *     tags: [Login]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Token válido
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 user:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       format: uuid
     *                     email:
     *                       type: string
     *       401:
     *         description: Token inválido ou não fornecido
     *       403:
     *         description: Acesso negado
     */
    async verifyToken(req,res){
        try {
            const user = await this.LoginUseCase.verifyToken(req.headers['authorization']);
            return res.status(200).json({ message: "Token válido", user });
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: error.message }); 
        }
    }
}