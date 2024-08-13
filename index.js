const express = require('express');
const { connectDB,sequelize } = require('./app/config/Database');
const UserRoute = require('./app/routes/UserRoute');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/api/users',UserRoute);

sequelize.sync().then(() => {
    app.listen(port,() => {
        console.log(`API rodando em http://localhost:${port}`);
    });
}).catch((error)=>{
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
});
