const validator = require('validator');

function validateEmail(res,email){
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Email inválido"});
    }
}

module.exports = {
    validateEmail,
};