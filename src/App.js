import React, { Component } from 'react';
import axios from 'axios';
import {SearchForm} from './SearchForm';

class App extends Component {
  constructor(){
    super();
    this.state = { username: '', githubInfo: [], apperror:'' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    var _this = this;
    // Call to Github API
    axios.get(`https://api.github.com/users/${this.state.username}/repos`)
         .then(function(response) {
           _this.setState({ githubInfo: response.data });
         })
         .catch(function (error) {
            console.log(error);
            _this.setState({ apperror: 'Not found. Try another username' })
          });
          // Delete text in input field
          this.setState({ username:'' })
  }


  handleChange(e) {
    this.setState({ username: e.target.value })
    // Clear out the old response and error data
    this.setState({ githubInfo: [], apperror: '' });
  }
    

  render() {
    // Calls a defined callback function on each element of githubInfo array, and returns an array that contains the results.
    var list = this.state.githubInfo.map(info => {
      return (
        <div className="list-group" key={info.id}>
          <span className="label label-info">{ info.owner.login }</span> <span className="label label-success">{ info.pushed_at }</span>
          <a href={info.html_url} className="list-group-item" target="_blank"><strong>{info.name}</strong> - {info.description} &raquo;</a>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <h1>GitHub Repositories <span className="badge">{ this.state.githubInfo.length} repos</span></h1>
          <hr />
          <SearchForm handleChange={ this.handleChange } currentValue={ this.state.username } handleSubmit={ this.handleSubmit }/>
          <br />
            { this.state.apperror }
            {list}
        </div>
      </div>
    );
  }
}

export default App;
