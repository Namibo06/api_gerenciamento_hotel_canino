const Owner = require('../models/Owner');
const { validateEmail } = require('../utils/validationEmail');
const { validateFormatUUID } = require('../utils/validationUUID');
const { validateLength } = require('../utils/validationLength');
const { validateEmpty } = require('../utils/validationEmpty');

exports.listOwners = async (req,res) => {
    try{
        const owners = await Owner.findAll();

        if(owners.length === 0){
            return res.status(404).json({message: "Nenhum  registro encontrado"});    
        }

        return res.status(200).json({owners: owners});
    }catch(error){
        return res.status(500).json({message: "Erro: " + error});
    }
};

exports.getOwnerByUUID = async (req,res) => {
    const uuid = req.params.uuid;
    validateFormatUUID(res,uuid);
    if (res.headersSent) return;

    try{    
        const owner = await Owner.findByPk(uuid);
        return res.status(200).json({owner: owner});
    }catch(error){
        console.log("Erro: " + error);
    }
};

exports.createOwner = async (req,res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const phone = req.body.phone;

    validateEmail(res,email);
    if (res.headersSent) return;
    validateLength(res,firstName,lastName,cpf,phone);
    if (res.headersSent) return;
    validateEmpty(res,firstName,email,phone,cpf);
    if (res.headersSent) return;

    try{
        const owner = await Owner.create(req.body);
        return res.status(201).json({message: "Dono cadastrado com sucesso",owner: owner});
    }catch(error){
        console.log("Erro: " + error);
    }
};

exports.updateOwner = async (req,res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const phone = req.body.phone;

    const uuid = req.params.uuid;
    validateFormatUUID(res,uuid);
    if (res.headersSent) return;

    validateEmail(res,email);
    if (res.headersSent) return;
    validateLength(res,firstName,lastName,cpf,phone);
    if (res.headersSent) return;
    validateEmpty(res,firstName,email,phone,cpf);
    if (res.headersSent) return;

    try{
        const [updated] = await Owner.update(req.body,{
            where:{
                id:uuid
            }
        });
    
        if(!updated){
            return res.status(500).json({message: "Falha ao tentar atualizar"});
        }

        return res.status(200).json({message: "Atualizado com sucesso"});
    }catch(error){
        console.log("Erro: " + error);
    }

};

exports.deleteUser = async (req,res) => {
    const uuid = req.params.uuid;
    validateFormatUUID(res,uuid);
    if(res.headersSent) return;

    try{
        const owner = await Owner.destroy({
            where:{
                id:uuid
            }
        });

        if(!owner){
            return res.status(404).json({message: "Dono não encontrado"});
        }

        return res.status(204).send();
    }catch(error){
        console.log("Erro: " + error);
    }
};