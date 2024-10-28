const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../../infrastructure/config/Database');

const dog = sequelize.define('tb_dogs', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
    },
    name: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    postage: {
        type: DataTypes.ENUM('PEQUENO', 'MEDIO', 'GRANDE'),
        allowNull: false,
    },
    race: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    deficiency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

dog.associate = function (models) {
    dog.belongsToMany(models.owner, { 
        through: 'tb_owner_dogs',
        as: 'dogOwners',
        foreignKey: 'dogId',
        onDelete: 'CASCADE'
    });

    dog.belongsToMany(models.restriction, {
        through: 'tb_restriction_dogs',
        as: 'dogRestrictions',
        foreignKey: 'dogId',
        onDelete: 'CASCADE',
    });
};

module.exports = dog;