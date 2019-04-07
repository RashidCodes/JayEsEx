import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos'
import Header from './components/Layout/Header'
import AddToDo from './components/AddToDo'
import About from './components/Pages/About'

// import uuid from 'uuid'
import axios from 'axios';

// I want to pass the todos in the App's state to the Todos component as a prop

class App extends Component {
  state = {
    todos: []
  }

  // life cycle hook that is called when the component is rendered
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({ todos: res.data}))
  }

  // Toggle Comlete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }

      return todo
    })})
  }

  // delete the todo Item
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
   
  }

  // Add todo
  // we wanna make a post request
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   // title: title or,
    //   title, //thing with ES6
    //   completed: false
    // }
    axios.post("https://jsonplaceholder.typicode.com/todos", {
      title, 
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddToDo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />

            <Route path='/about' component={About} />
            
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
