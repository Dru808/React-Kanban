/*jshint esversion: 6*/

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'kanban_board',
  user: 'normal_user'
};

const PGP = require ('pg-promise')();
const db = PGP(connection);

module.exports = db;