const validator = require('validator');

function validatePasswordEmptyOrNull(res,password){
    if(validator.isEmpty(password) || password === null){
        res.status(400).json({message: "Senha vazia ou nula"});
    }
}

function validatePasswordLength(res,password){
    if(password.length > 32 || password.length < 8){
        res.status(422).json({message: "Senha deve ter dentre 8 a 32 caracteres"});
    }
}

module.exports = {
    validatePasswordEmptyOrNull,
    validatePasswordLength
}