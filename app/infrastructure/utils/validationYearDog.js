function validationYearDog(res,year){
    if(year > 30 || year <= 0){
        return res.status(400).json({message: "A idade deve ser dentre 1 a 30 anos"});
    }
}

module.exports = { 
    validationYearDog 
};