const { DataTypes, UUIDV4 } = require('sequelize');
const {sequelize} = require('../../infrastructure/config/Database');

const owner = sequelize.define('tb_owners',{
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cpf:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

owner.associate = function(models){
    owner.belongsToMany(models.dog,{
        through:'tb_owner_dogs',
        as: 'ownerDogs',
        foreignKey: 'ownerId',
    });
};

module.exports = owner;