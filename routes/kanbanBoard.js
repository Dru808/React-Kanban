/*jshint esversion: 6*/

const express = require('express');
const kanbanBoardRouter = express.Router();
const {Cards} = require('../models');

kanbanBoardRouter.route('/')
  .get((req, res) => {
    Cards.findAll()
      .then((allCards) => {
        // let cards = allCards.map(item => {
        //   return item.dataValues;
        // });
        res.json(allCards);
      })
      .catch(error => {
        console.log(error);
        res.json(error);
      });
  });

kanbanBoardRouter.route('/new')
  .post((req, res) => {
    console.log('body ', req.body);
    Cards.create( req.body )
      .then( res.json.bind(res) )
      .catch( res.json.bind(res) );
});

  module.exports = kanbanBoardRouter;