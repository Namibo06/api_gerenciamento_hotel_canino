const { DataTypes, UUIDV4 } = require('sequelize');
const {sequelize} = require('../../infrastructure/config/Database');

const user = sequelize.define('tb_users',{
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
    },
    first_name:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    email:{
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
    },
    phone:{
        type: DataTypes.CHAR(11),
        allowNull: true,
    },
    password:{
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
},{
    tableName: 'tb_users',
    timestamps: true
});

module.exports = user;