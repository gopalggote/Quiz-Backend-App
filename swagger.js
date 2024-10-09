// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0', // OpenAPI version
    info: {
        title: 'Quiz API Documentation', // Title of the API documentation
        version: '1.0.0', // API version
        description: 'API documentation for Quiz Application', // Description of your API
    },
    servers: [
        {
            url: 'http://localhost:3000', // Server URL
            description: 'Development server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./controller/*.js'], // Path to the API docs (your routes)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
