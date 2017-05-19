/*jshint esversion: 6*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard, loadCards } from '../../actions';

class NewCardForm extends Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      title: "",
      card_id: "",
      priority: "",
      status: "",
      created_by: "",
      assigned_to: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCardIdChange = this.handleCardIdChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // addCard(card){
  //   console.log('card', card);
  //   // update my parent's cards state
  //   this.props.addCard(card);

  //   const title = "";
  //   const card_id = "";
  //   const priority = "";
  //   const status = "";
  //   const created_by = "";
  //   const assigned_to = "";
  //   this.setState({
  //     title,
  //     card_id,
  //     priority,
  //     status,
  //     created_by,
  //     assigned_to
  //   });
  // }


  handleSubmit(event) {
    event.preventDefault();

    return fetch('/api/cards/new', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"

      }),
      body: JSON.stringify(this.state)
    });
    //   .then(cards => {
    //     dispatch({
    //       type: ADD_CARD,
    //       cards
    //     });
    //   });
  // };
    // this.props.addCard(this.state);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handleCardIdChange(event) {
    this.setState({ card_id : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }

  handleCreatedByChange(event) {
    this.setState({ created_by : event.target.value });
  }

  handleAssignedToChange(event) {
    this.setState({ assigned_to : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <input type="text" placeholder="card_id" onChange={this.handleCardIdChange} value={this.state.author} />
        </div>
        <div>
          <input type="text" placeholder="priority" onChange={this.handlePriorityChange} value={this.state.author} />
        </div>
        <div>
          <input type="text" placeholder="status" onChange={this.handleStatusChange} value={this.state.author} />
        </div>
        <div>
          <input type="text" placeholder="created_by" onChange={this.handleCreatedByChange} value={this.state.author} />
        </div>
        <div>
          <input type="text" placeholder="assigned_to" onChange={this.handleAssignedToChange} value={this.state.author} />
        </div>
        <div>
          <button type="submit">Add Card</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCard: card => dispatch(addCard(card)),
    loadCards: () => dispatch(loadCards())
  };
}

const ConnectedCardForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardForm);

export default ConnectedCardForm;