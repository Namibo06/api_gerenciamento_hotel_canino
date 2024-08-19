const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { connectDB,sequelize } = require('./app/infrastructure/config/Database');
const UserRoute = require('./app/application/routes/UserRoute');
const OwnerRoute = require('./app/application/routes/OwnerRoute');
const DogRoute = require('./app/application/routes/DogRoute');
const LoginRoute = require('./app/application/routes/LoginRoute');
const owner = require('./app/domain/models/Owner');
const dog = require('./app/domain/models/Dog');

const app = express();
app.use(express.json());
const port = 3000;

connectDB();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gerenciador Hotel Canino',
            version: '1.0.0',
            description: 'API RESTFull com Node.js e Express'
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./app/application/controllers/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocs));
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
