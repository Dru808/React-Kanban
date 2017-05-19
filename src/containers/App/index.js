/*jshint esversion: 6*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../../components/CardList.js';
import NewCardForm from '../newCardForm';
// import { addBookToFakeXHR, getBooksFromFakeXHR } from '../../lib/books.db';
import { loadCards, addCard } from '../../actions';

import logo from './logo.svg';
import './styles.css';
import Card from '../../components/Card.js';


class App extends Component{

  constructor(props){
    super(props);

    this.title = 'Card List App';
    // this.state = {
    //   cards : []
    // };


    // this.addCard = this.addCard.bind(this);
    this.cardInProgressClick = this.cardInProgressClick.bind(this);
    this.cardToDoClick = this.cardToDoClick.bind(this);
    this.cardDoneClick = this.cardDoneClick.bind(this);

  }

  componentDidMount() {
  //   this.getCards().then( cards => {
  //     this.setState({ cards });
  //   });
  }

  // getCards(){
  //   return getCardsFromFakeXHR();
  // }

  setFilter(e){
    // console.log(e.target.value);
    this.setState({ filter : e.target.value });
  }

  // addCard(card){
  //   this.props.addCard( card );
  //   // this.setState({
  //   //   cards : this.state.cards.concat(card)
  //   // });
  // }

  cardInProgressClick(card){

      card.status = 'in progress';
      this.setState({

      })
  }

  cardDoneClick(card){

      card.status = 'done';
      this.setState({

      })
  }

    cardToDoClick(card){

      card.status = 'todo';
      this.setState({

      })
  }

  render(){

    const todoCards = this.props.cards.filter((currEl) => {
      return currEl.status === 'todo'
    })

    const inProgressCards = this.props.cards.filter((currEl) => {
      return currEl.status === 'in progress'
    })

    const doneCards = this.props.cards.filter((currEl) => {
      return currEl.status === 'done'
    })


    return (
      <div className="boardContainer">
        <CardList
          cards={todoCards}
          customClassName="todo"
          cardInProgressClick={this.cardInProgressClick}
          cardToDoClick={this.cardToDoClick}
          cardDoneClick={this.cardDoneClick}

        />

        <CardList
          cards={inProgressCards}
          customClassName="in-progress"
          cardInProgressClick={this.cardInProgressClick}
          cardToDoClick={this.cardToDoClick}
          cardDoneClick={this.cardDoneClick}
        />

        <CardList
          cards={doneCards}
          customClassName="done"
          cardInProgressClick={this.cardInProgressClick}
          cardToDoClick={this.cardToDoClick}
          cardDoneClick={this.cardDoneClick}
        />

        <NewCardForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCards: cards => {
      dispatch(loadCards(cards))
    },
    addCard: card => {
      dispatch(addCard(card))
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;

