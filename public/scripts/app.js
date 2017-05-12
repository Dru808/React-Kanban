/*jshint esversion: 6*/

const reactContainer = document.getElementById("root");
const reactContainer2 = document.getElementById("todo");
const reactContainer3 = document.getElementById("in-progress");
const reactContainer4 = document.getElementById("done");


const getCardsFromFakeXHR = () => new Promise((resolve, reject) => {
  const cardsFromFakeDB = [
    {
      card_id : 1,
      title : 'do laundry',
      priority: 'medium',
      status: 'done',
      created_by: 'Andrew Tram',
      assigned_to: 'Andrew Tram'
    },
    {
      card_id : 2,
      title : 'sell car',
      priority: 'high',
      status: 'in progress',
      created_by: 'Andrew Tram',
      assigned_to: 'Andrew Tram'
    },
    {
      card_id : 3,
      title : 'eat spaghetti',
      priority: 'medium',
      status: 'in progress',
      created_by: 'Andrew Tram',
      assigned_to: 'Andrew Tram'
    },{
      card_id : 4,
      title : 'wash car',
      priority: 'medium',
      status: 'todo',
      created_by: 'Andrew Tram',
      assigned_to: 'Andrew Tram'

    },{
      card_id : 5,
      title : 'sleep',
      priority: 'medium',
      status: 'done',
      created_by: 'Andrew Tram',
      assigned_to: 'Andrew Tram'
    }

  ];

  setTimeout(() => resolve(cardsFromFakeDB), 250);
});

const Card = (props) => (
  <li className="card">
    <h3>{props.card.title}</h3>
    <p>Id: {props.card.card_id}</p>
    <p>Priority: {props.card.priority}</p>
    <p>Status: {props.card.status}</p>
    <p>Created by: {props.card.created_by}</p>
    <p>Assigned to: {props.card.assigned_to}</p>
    <button onClick={props.cardInProgressClick(props.card)}>move to in progress</button>
    <button>move to done</button>
    <button>move to todo</button>
  </li>
  );

const CardSearchFilter = filter =>
  ({ cardId, title, priority, status, created_by, assigned_to }) =>
    filter === "" ||
      title.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      cardId.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      priority.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      status.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      createdBy.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      assignedTo.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

const CardList = ({ cards, customClassName, moveToProgress, cardInProgressClick }) => (

  <ul id="test" className={customClassName}>
    {cards
      .map(cardObj => {
        console.log('obj ', cardObj);
       return <Card card={cardObj} cardInProgressClick={cardInProgressClick} />
      })

      }

  </ul>

);

class NewCardForm extends React.Component {

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

  addCard(card){
    console.log(card);
    // update my parent's cards state
    this.props.addCard(card);

    const title = "";
    const card_id = "";
    const priority = "";
    const status = "";
    const created_by = "";
    const assigned_to = "";
    this.setState({
      title,
      card_id,
      priority,
      status,
      created_by,
      assigned_to
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
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

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards : []
    };


    this.addCard = this.addCard.bind(this);

  }

  componentDidMount() {
    this.getCards().then( cards => {
      this.setState({ cards });
    });
  }

  getCards(){
    return getCardsFromFakeXHR();
  }

  setFilter(e){
    // console.log(e.target.value);
    this.setState({ filter : e.target.value });
  }

  addCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }

  cardInProgressClick(card){
    return (e) => {
      console.log(card);
    }
  }

  render(){

    const todoCards = this.state.cards.filter((currEl) => {
      return currEl.status === 'todo'
    })

    const inProgressCards = this.state.cards.filter((currEl) => {
      return currEl.status === 'in progress'
    })

    const doneCards = this.state.cards.filter((currEl) => {
      return currEl.status === 'done'
    })


    return (
      <div className="boardContainer">
        <CardList
          cards={todoCards}
          customClassName="todo"
          moveToProgress="in progress"
          cardInProgressClick={this.cardInProgressClick}

        />

        <CardList
          cards={inProgressCards}
          customClassName="in-progress"

        />

        <CardList
          cards={doneCards}
          customClassName="done"
          moveToProgress="in progress"
        />

        <NewCardForm addCard={this.addCard}/>
      </div>
    );
  }
};


ReactDOM.render(
  // component to render
  <App />,

  // where to inject this component
  // dom element, or use getElementById
  reactContainer
);

