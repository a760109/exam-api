const config = require('../config');
const Sequelize = require('sequelize');

//database wide options
const opts = {
  host: config.EXAM_DB_HOSTNAME,
  dialect: config.EXAM_DB_TYPE,
  define: {
    freezeTableName: true,
    sync: true,
  },
  dialectOptions: {
    connectTimeout: 10000,
  },
  logging: false,
};

let db = {};

const sequelize = new Sequelize(config.EXAM_DB_NAME, config.EXAM_DB_USERNAME, config.EXAM_DB_PASSWORD, opts);
db.sequelize = sequelize;

db.alter = config.EXAM_DB_ALTER || false;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: db.alter });
  })
  .then(() => {
    console.log(`Synchronize successfully, alter=${db.alter}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;

module.exports = db;
