import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../../components/CardList';
import NewCardForm from '../newCardForm';
import { loadCards, addCard } from '../../actions';

import { withRouter } from 'react-router-dom';

// import logo from './logo.svg';
// import './styles.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.title = 'Card List App';
  }

  // life cycle hook
  // before rendering this component
  componentWillMount(){
    console.log(this.props)
  }

  login = (e) => {
    e.preventDefault()
    //fake XHR Login
    //
    console.log('test')
    console.log(this.props.history)
    // setTimeout(()=>{
    //   this.props.history.push('/secret')
    // })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.login}>
          <input placeholder="username" />
          <input placeholder="password" />
          <input type="submit" value="Login" />
        </form>
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

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default withRouter(ConnectedLogin);