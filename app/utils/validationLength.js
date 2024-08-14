const validator = require('validator');

function validateLength(res,firstName,lastName,cpf,phone){
    validateRequestLength(res,firstName,lastName,phone);
    if (res.headersSent) return;

    if(cpf.length > 11 || cpf.length < 11){
        return res.status(400).json({message: "CPF deve conter 11 caracteres"});
    }
}

function validateRequestLength(res,firstName,lastName,phone){
    if(firstName.length < 3 || firstName > 15){
        return res.status(400).json({message:"Primeiro nome deve conter entre 3 e 15 caracteres"});
    }

    if(!validator.isEmpty(lastName)){
        if(lastName.length < 3 || lastName.length > 15){
            return res.status(400).json({message: "Sobrenome deve conter entre 3 e 15 caracteres"});
        }
    }

    if(!validator.isEmpty(phone)){
        if(phone.length < 11 || phone.length > 11){
            return res.status(400).json({message: "Telefone deve conter 11 caracteres no formato 75990000000"});
        }
    }
}

function validateRequestLengthInCreate(res,firstName,lastName,phone,password){
    validateRequestLength(res,firstName,lastName,phone);

    if(password.length < 8 || password.length > 32){
        return res.status(400).json({message: "Senha deve conter entre 8 e 32 caracteres"});
    }
}

module.exports = {
    validateLength,
    validateRequestLength,
    validateRequestLengthInCreate,
};