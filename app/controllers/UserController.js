const User = require('../models/User');
const validator = require('validator');
const { validateEmail } = require('../utils/validationEmail');
const { validateRequestLengthInCreate,validateRequestLength } = require('../utils/validationLength');
const { validateRequestEmptyInCreate,validateRequestEmptyInUpdate } = require('../utils/validationEmpty');

exports.listUsers = async (req,res) => {
    try{
        const users = await User.findAll();

        if(users.length === 0){
            return res.status(404).json({message: "Nenhum  registro encontrado"});    
        }

        res.status(200).json({users: users});
    }catch(error){
        return res.status(500).json({message:"Erro: " + error});
    }
};

exports.getUserByUUID = async (req,res) => {
    const uuid = req.params.uuid;

    try{
        if(!validator.isUUID(uuid)){
            return res.status(400).json({message: "formato de UUID inválido"});  
        }

        const user = await User.findByPk(uuid);

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        return res.status(200).json({user: user});

    }catch(error){
        return res.status(500).json({message: "Erro: " + error.message});
    }
}

exports.createUser = async (req,res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    validateRequestEmptyInCreate(res,firstName,email,password);
    validateEmail(res,email);
    validateRequestLengthInCreate(res,firstName,lastName,phone,password);

    try{
        const user = await User.create(req.body);
        return res.status(201).json({message:"Usuário criado com sucesso",user: user});
    }catch(error){
        console.log(error);
    }
};

exports.updateUser = async (req,res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;

    validateEmail(res,email);
    validateRequestLength(res,firstName,lastName,phone);
    validateRequestEmptyInUpdate(res,firstName,email);

    try{
        const [updated] = await User.update(req.body,{
            where:{
                id:req.params.uuid
            }
        });

        if(!updated){
            return res.status(400).json({message:"Houve falha ao tentar atualizar"});
        }

        return res.status(200).json({message: "Usuário atualizado com sucesso"});
    }catch(error){
        console.log("Erro: " + error.message);
    }
};

exports.deleteUser = async (req,res) => {
    const uuid = req.params.uuid;

    try{
        if(!validator.isUUID(uuid)){
            return res.status(400).json({message: "Formato UUID inválido"});   
        }

        const user = await User.destroy({
            where:{
                id: uuid
            }
        });

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        return res.status(204).send();
    }catch(error){
        console.log("Erro: " + error);
    }
};