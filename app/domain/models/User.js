const { DataTypes, UUIDV4 } = require('sequelize');
const {sequelize} = require('../../infrastructure/config/Database');

const user = sequelize.define('tb_users',{
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
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
},{
    tableName: 'tb_users',
    timestamps: true
});

module.exports = user;