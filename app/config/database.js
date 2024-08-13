const { Sequelize } = require('sequelize');

require('dotenv').config();

const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dialect = process.env.DIALECT;
const host = process.env.HOST;

const sequelize =  new Sequelize(db,user,password,{
    host: host,
    dialect: dialect,
});

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("Banco autenticado!");
    }catch(error){
        console.log("Erro ao autenticar com banco: " + error);
        process.exit(1);
    }
}

module.exports = { sequelize,connectDB };