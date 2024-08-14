const Dog = require('../models/Dog');
const { validationYearDog } = require('../utils/validationYearDog');
const { validationPostage } = require('../utils/validationPostage');
const { validateFormatUUID } = require('../utils/validationUUID');
const { validateDogLength } = require('../utils/validationDogLength');
const { validateDogEmpty } = require('../utils/validationDogEmpty');
const Owner = require('../models/Owner');

exports.listDogs = async (req,res) => {
    try{
        const dogs = await Dog.findAll();

        if(dogs.length === 0){
            return res.status(404).json({message: "Nenhum registro encontrado"});
        }

        return res.status(200).json({dogs: dogs});
    }catch(error){
        console.log("Erro: " + error);
    }
}

exports.createDog = async (req,res) => {
    try{
        const name = req.body.name;
        const year = req.body.year;
        const color = req.body.color;
        const postage = req.body.postage;
        const race = req.body.race;
        //const restrictions = req.body.restrictions;
        const deficiency = req.body.deficiency;
        const owners = req.body.owners;

        validationYearDog(res,year);
        if (res.headersSent) return;
        validationPostage(res,postage);
        if (res.headersSent) return;
        validateDogLength(res,name,color,race);
        if (res.headersSent) return;
        validateDogEmpty(res,name,color,year,postage,deficiency);
        if (res.headersSent) return;

        let listOwner = [];
        for (let i = 0; i < owners.length; i++) {
            let ownerId = owners[i];
            validateFormatUUID(res,ownerId);
            if (res.headersSent) return;
            let ownerExists = await Owner.findByPk(ownerId);

            if(!ownerExists){
                listOwner.push(ownerId);
                console.log(listOwner);
            }
        }

        if (listOwner.length > 0) {
            return res.status(400).json({
                error: `Os seguintes IDs de donos são inválidos: ${listOwner.join(', ')}`
            });
        }

        const dog = await Dog.create(req.body);
        return res.status(201).json({dog: dog});
    }catch(error){
        console.log("Erro: " + error);
    }
}