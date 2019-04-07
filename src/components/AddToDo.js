import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class AddToDo extends Component {
    state = {
        title : ''
    }

    onChange = (e) => this.setState({ [e.target.name] : e.target.value });

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state.title)
        this.setState({ title: ''})
    }


  render() {
    return (
      <form style={{display: 'flex'}} onSubmit={this.onSubmit}>
          <input type='text' name='title' placeholder='Add todo...' style={{flex: '10', padding: '5px'}} onChange={this.onChange}/>
          <input type='submit' value='SUBMIT' className="btn" style={{flex: '1'}}/>
      </form>
    )
  }
}


AddToDo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}