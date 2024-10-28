const { DataTypes, UUIDV4 } = require('sequelize');
const {sequelize} = require('../../infrastructure/config/Database');

const owner = sequelize.define('tb_owners',{
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    first_name:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    cpf:{
        type: DataTypes.CHAR(11),
        unique: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
    },
    phone:{
        type: DataTypes.CHAR(11),
        allowNull: false,
    },
});

owner.associate = function(models) {
    owner.belongsToMany(models.dog, {
        through: 'tb_owner_dogs',
        as: 'ownerDogs',
        foreignKey: 'ownerId',
    });
};

module.exports = owner;