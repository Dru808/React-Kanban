import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
import NewCardForm from '../newCardForm';
import {loadCards, addCard } from '../../actions';
import { withRouter } from 'react-router-dom';


import logo from './logo.svg';


class OtherCardList extends Component {
  constructor(props){
    // give props to your parents
    super(props);
    // do your shit after parent is done doing their shit

    this.title = 'Card List App';

    // set the initial state of THIS COMPONENT
    // in the constructor
    // this.state = {
    //   cards : [],
    //   filter : ''
    // };
  }

  // life cycle hook
  // before rendering this component
  componentWillMount(){
    // this.props.loadCards();
    // login xhr
    setTimeout(()=>{
      this.props.history.push('/')
    },1000)
  }

  addCard = ( card ) => {
    // addCardToFakeXHR( card )
    //   .then( cards => {
    //     this.setState({ cards });
    //   });
    this.props.addCard( card );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>OTHER CARD LIST</h2>
        </div>
        <CardList cards={this.props.cards} />
        <NewCardForm addCard={this.addCard} />
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

const ConnectedOtherCardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherCardList);

export default withRouter(ConnectedOtherCardList);