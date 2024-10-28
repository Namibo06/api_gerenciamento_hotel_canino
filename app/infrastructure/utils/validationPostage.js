function validationPostage(res,postage){
    if(postage !== "PEQUENO" && postage !== "MEDIO" && postage !== "GRANDE"){
        return res.status(400).json({message: "Porte deve ser 'Pequeno','Medio',ou 'Grande'"});
    }
}

module.exports = {
    validationPostage
};