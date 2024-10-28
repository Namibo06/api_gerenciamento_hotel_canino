const { UUIDV4,DataTypes } = require("sequelize");
const { sequelize } = require("../../infrastructure/config/Database");

const restriction = sequelize.define('tb_restrictions',{
    id:{
        primaryKey:true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
    },
    type_name:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

restriction.associate = function(models) {
    restriction.belongsToMany(models.dog, {
        through: 'tb_restriction_dogs',
        as: 'restrictionDogs',
        foreignKey: 'restrictionId',
    });
};

module.exports = restriction;