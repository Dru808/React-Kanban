/*jshint esversion: 6*/

const express = ('express');
const Router = express.Router();

Router.use('/cards', require('./Cards'));

module.exports = Router;