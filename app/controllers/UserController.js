const User = require('../models/User');
const validator = require('validator');

exports.listUsers = async (req,res) => {
    try{
        const users = await User.findAll();
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

    validateRequest(res,firstName,lastName,email,phone,password);

    try{
        const user = await User.create(req.body);
        return res.status(201).json({message:"Usuário criado com sucesso",user: user});
    }catch(error){
        console.log(error);
    }
};

function validateRequest(res,firstName,lastName,email,phone,password){
    if(validator.isEmpty(firstName) || validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json({message:"Campos obrigatórios vazios"});
    }

    if(firstName.length < 3 || firstName > 15){
        return res.status(400).json({message:"Primeiro nome deve conter entre 3 e 15 caracteres"});
    }

    if(!validator.isEmpty(lastName)){
        if(lastName.length < 3 || lastName.length > 15){
            return res.status(400).json({message: "Sobrenome deve conter entre 3 e 15 caracteres"});
        }
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Email inválido"});
    }

    if(!validator.isEmpty(phone)){
        if(phone.length < 11 || phone.length > 11){
            return res.status(400).json({message: "Telefone deve conter 11 caracteres no formato 75990000000"});
        }
    }

    if(password.length < 8 || password.length > 32){
        return res.status(400).json({message: "Senha deve conter entre 8 e 32 caracteres"});
    }
}