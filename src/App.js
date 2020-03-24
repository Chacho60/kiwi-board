import React, { Component } from 'react';
import './App.css';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './Column.jsx'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        tasks: null,
    };

    this.getTasks = this.getTasks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

  }

  getTasks(){
    fetch('https://9789148e.ngrok.io/get-cards', {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    mode: 'cors'
    }).then((response) => {
        return (response.json());
    }) // null
    .then((response) => {
        this.setState({
          tasks: response,
          gotData: true
        });
    })
  }

  onDragEnd = result => {
    console.log(result.source);
    console.log(result.destination);
    let cards = this.state.tasks;
    cards.forEach(card => {
      if(card.index === result.destination.index && card.status === result.destination.droppableId){
        card.index =+ 1;
      }
      if(card.index === result.source.index && card.status === result.source.droppableId){
        card.index = result.destination.index;
        card.status = result.destination.droppableId;
      }
    });
    
    this.setState({ tasks: cards})



  }

  componentWillMount(){
    this.getTasks();
  }
  

  render() {
    console.log("This are the tasks: ");
    console.log(this.state.tasks);
    if(this.state.tasks){
      return (
        <div className="App">
          <div className="App-header">
            <div className="App-header-title">Kiwi</div>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="App-body">
            <Droppable droppableId="Stage1" direction="Horizontal" type="Stage">
              {provided => (
                <Column innerRef={provided.innerRef} colName="todo" cards={this.state.tasks.filter(card => card.status === "todo" )}>
                  {provided.placeholder}
                </Column>
               )}
            </Droppable>
            <Droppable droppableId="Stage2" direction="Horizontal" type="Stage">
              {provided => (
                <Column innerRef={provided.innerRef} colName="in-progress" stageName="Stage3" cards={this.state.tasks.filter(card => card.status === "in-progress" )}>
                  {provided.placeholder}
                </Column>
               )}
            </Droppable>
            <Droppable droppableId="Stage2" direction="Horizontal" type="Stage">
              {provided => (
                <Column innerRef={provided.innerRef} colName="testing" stageName="Stage3" cards={this.state.tasks.filter(card => card.status === "testing" )}>
                  {provided.placeholder}
                </Column>
               )}
            </Droppable>
            <Droppable droppableId="Stage2" direction="Horizontal" type="Stage">
              {provided => (
                <Column innerRef={provided.innerRef} colName="done" stageName="Stage3" cards={this.state.tasks.filter(card => card.status === "done" )}>
                  {provided.placeholder}
                </Column>
               )}
            </Droppable>
            </div>
          </DragDropContext>
        </div>
      );
    }else{
      console.log("Loading...");
      return (
        <div className="App">
          Loading...
        </div>
      );
    }
    
  }
}

export default App;
