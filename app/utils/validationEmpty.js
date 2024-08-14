const validator = require('validator');

function validateEmpty(res,firstName,email,phone,cpf){
    validateRequestEmptyInUpdate(res,firstName,email);
    if (res.headersSent) return;

    if(validator.isEmpty(phone) || validator.isEmpty(cpf)){
        return res.status(400).json({message:"Campos obrigatórios vazios"});
    }
}

function validateRequestEmptyInCreate(res,firstName,email,password){
    if(validator.isEmpty(firstName) || validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json({message:"Campos obrigatórios vazios"});
    }
}

function validateRequestEmptyInUpdate(res,firstName,email){
    if(validator.isEmpty(firstName) || validator.isEmpty(email)){
        return res.status(400).json({message:"Campos obrigatórios vazios"});
    }
}

module.exports = {
    validateEmpty,
    validateRequestEmptyInCreate,
    validateRequestEmptyInUpdate,
};