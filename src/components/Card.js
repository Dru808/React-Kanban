/*jshint esversion: 6*/

import React from 'react';

const Card = ({card, cardInProgressClick, cardToDoClick, cardDoneClick, key}) => (
  <li>
    <h3>{ card.title }</h3>
    <p>priority: { card.priority }</p>
    <p>status: { card.status }</p>
    <p>created by: { card.created_by }</p>
    <p>assigned to: { card.assigned_to }</p>

    <button onClick={() => {
      cardInProgressClick(card)}
      }>move to in progress</button>
    <button onClick={() => {
      cardDoneClick(card)}
    }>move to done</button>
    <button onClick={() => {
      cardToDoClick(card)}
    }>move to todo</button>
  </li>
);

export default Card;
