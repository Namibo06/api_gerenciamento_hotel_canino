function validateNameDogLength(res,name){
    if(name.length > 26 || name.length < 3){
        return res.status(400).json({message: "Nome deve ter entre 3 e 25 caracteres"});
    }
}

function

module.exports = {
    validateNameDogLength,
}