const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

let app = express();

let swaggerDocument;

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'KentLu Exam API',
      version: 'v1',
      description: 'KentLu Exam API document with swagger',
    },
  },
  apis: ['./routes/*.js', './routes/*/*/*.js', './swagger.yaml'],
};
swaggerDocument = swaggerJsdoc(options);

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: false,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  }),
);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Transform buffer body to specified type
app.use(require('./middleware/contentTypeTransform').contentTypeTransformMiddleware);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

app.use('/exam/v1/auth', require('./routes/exam/v1/auth'));

module.exports = app;
