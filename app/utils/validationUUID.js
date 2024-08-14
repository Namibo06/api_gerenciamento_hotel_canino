const validator = require('validator');

function validateFormatUUID(res,uuid){
    if(!validator.isUUID(uuid)){
        return res.status(400).json({message: "Formato do UUID inválido"});
    }
}

module.exports = {
    validateFormatUUID,
};