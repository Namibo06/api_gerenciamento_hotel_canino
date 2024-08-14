const Owner = require('../models/Owner');
const validator = require('validator');
const { validateEmail, validateRequestLength, validateRequestEmptyInUpdate } = require('../controllers/UserController');

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

/**validations */
function validateLength(res,firstName,lastName,cpf,phone){
    validateRequestLength(res,firstName,lastName,phone);
    if (res.headersSent) return;

    if(cpf.length > 11 || cpf.length < 11){
        return res.status(400).json({message: "CPF deve conter 11 caracteres"});
    }
}

function validateEmpty(res,firstName,email,phone,cpf){
    validateRequestEmptyInUpdate(res,firstName,email);
    if (res.headersSent) return;

    if(validator.isEmpty(phone) || validator.isEmpty(cpf)){
        return res.status(400).json({message:"Campos obrigatórios vazios"});
    }
}