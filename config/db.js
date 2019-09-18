const config = require('../knexfile');
const knex = require('knex')(config);

knex.migrate.lastest([condig]);
module.exports = knex;
