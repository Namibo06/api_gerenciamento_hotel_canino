const express = require('express');
const { connectDB,sequelize } = require('./app/config/Database');
const UserRoute = require('./app/routes/UserRoute');
const OwnerRoute = require('./app/routes/OwnerRoute');
const DogRoute = require('./app/routes/DogRoute');
const LoginRoute = require('./app/routes/LoginRoute');
const owner = require('./app/models/Owner');
const dog = require('./app/models/Dog');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/api/users',UserRoute);
app.use('/api/owners',OwnerRoute);
app.use('/api/dogs',DogRoute);
app.use('/api/login',LoginRoute);

owner.associate({ dog });
dog.associate({ owner });

sequelize.sync().then(() => {
    app.listen(port,() => {
        console.log(`API rodando em http://localhost:${port}`);
    });
}).catch((error)=>{
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
});
