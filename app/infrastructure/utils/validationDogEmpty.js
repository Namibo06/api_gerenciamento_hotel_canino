const validator = require('validator');

function validateDogEmpty(res,name,color,year,postage,deficiency){
    if(validator.isEmpty(name) || validator.isEmpty(color) || validator.isEmpty(year) || validator.isEmpty(postage) || validator.isEmpty(deficiency)){
        return res.status(400).json({message: "Campo(s) obrigatório(s) vazio(s)"});
    }
}

module.exports = {
    validateDogEmpty
};