const Owner = require('../models/Owner');
const validator = require('validator');

exports.listOwners = async (req,res) => {
    try{
        const owners = await Owner.findAll();

        if(owners.length === 0){
            return res.status(404).json({message: "Nenhum  registro encontrado"});    
        }

        return res.status(200).json({owners: owners});
    }catch(error){
        return res.status(500).json({message: "Erro: " + error});
    }
};