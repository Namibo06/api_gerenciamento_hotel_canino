const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('tb_user',{
    id:{
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = user;