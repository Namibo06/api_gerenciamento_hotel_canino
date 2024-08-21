const { DataTypes,UUIDV4 } = require('sequelize');
const {sequelize} = require('../../infrastructure/config/Database');

const dog = sequelize.define('tb_dogs',{
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    postage:{
        type: DataTypes.ENUM('Pequeno','Medio','Grande'),
        allowNull: false,
    },
    race:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    restrictions:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    deficiency:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    owners:{
        type: DataTypes.JSON,
        allowNull: false,
    },
});

dog.associate = function(models){
    dog.belongsToMany(models.owner,{
        through: 'tb_owner_dogs',
        as: 'dogOwners',
        foreignKey: 'dogId',
    });
};

module.exports = dog;