/*jshint esversion: 6*/

import React from 'react';
import Card from './Card';

// const CardList = ({ cards }) => (
//   <ul>
//     {
//       cards.map( ({ _id, title, priority, created_by, assigned_to }) =>
//         <Card
//           key={ _id }
//           title={ title }
//           priority={ priority }
//           created_by={ created_by }
//           assigned_to={ assigned_to }
//         />
//       )
//     }
//   </ul>
// );

const CardList = ({ cards, customClassName, moveToProgress, cardInProgressClick, cardToDoClick, cardDoneClick }) => (

  <ul className={customClassName}>
    {cards
      .map((cardObj, key) => {

       return <Card card={cardObj} cardInProgressClick={cardInProgressClick} cardToDoClick={cardToDoClick} cardDoneClick={cardDoneClick} key={key}/>
      })

      }

  </ul>

);

export default CardList;