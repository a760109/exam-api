var nconf = require('nconf');

nconf.use('memory');

// Command-line arguments
nconf.argv();

// Environment variables
nconf.env();

nconf.defaults({
  AUTH0_DOMAIN: 'a760109.us.auth0.com',
  EXAM_DB_TYPE: 'postgres',
  EXAM_DB_HOSTNAME: 'localhost',
  EXAM_DB_NAME: 'exam',
  EXAM_DB_USERNAME: 'idtech',
  EXAM_DB_PASSWORD: '1qaz@WSX',
  EXAM_DB_ALTER: true,
});

let conf = nconf.get();

conf._parse = function () {
  if (conf['EXAM_DB_ALTER']) {
    if (typeof conf['EXAM_DB_ALTER'] === 'string') {
      let v = conf['EXAM_DB_ALTER'].toLowerCase();
      if (v === 'true' || v === '1') {
        conf['EXAM_DB_ALTER'] = true;
      } else {
        conf['EXAM_DB_ALTER'] = false;
      }
    }
  }
};

conf._parse();

module.exports = conf;
