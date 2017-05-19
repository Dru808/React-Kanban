/*jshint esversion: 6*/

const express = ('express');
const cardsRouter = express.Router();
const {Cards} = require('../../models');

cardsRouter.get('/:id', (req, res) => {
  Cards.findById(req.params.id)
    .then( (card) => {
      res.json(card);
    });
});

cardsRouter.get('/', (req, res) => {
  Cards.all()
    .then( (cards) => {
      res.json(cards);
    });
});

cardsRouter.post('/', (req, res) => {
  Cards.create( req.body )
    .then( res.json.bind(res) )
    .catch( res.json.bind(res) );
});

module.exports = cardsRouter;

