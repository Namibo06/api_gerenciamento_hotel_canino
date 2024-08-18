function validationPostage(res,postage){
    if(postage !== "Pequeno" && postage !== "Medio" && postage !== "Grande"){
        return res.status(400).json({message: "Porte deve ser 'Pequeno','Medio',ou 'Grande'"});
    }
}

module.exports = {
    validationPostage
};