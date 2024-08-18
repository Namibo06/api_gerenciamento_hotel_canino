function validateDogLength(res,name,color,race){
    if(name.length > 25 || name.length < 3){
        return res.status(400).json({message: "Nome deve ter entre 3 e 25 caracteres"});
    }

    if(color.length > 15 || color.length < 4){
        return res.status(400).json({message: "Cor deve ter entre 4 e 15 caracteres"});
    }

    if(race.length > 25 || race.length < 3){
        return res.status(400).json({message: "Raça deve ter entre 3 e 25 caracteres"});
    }
}

module.exports = {
    validateDogLength,
}