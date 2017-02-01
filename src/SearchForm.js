import React from 'react';

// Stateless functional component
export const SearchForm = (props) => (
  
  <form onSubmit={ props.handleSubmit }>
    <input placeholder="Type a github username..." className="form-control" type="text"
      onChange={ props.handleChange }
      value={ props.currentValue }/>
    <br />
    <button className="btn btn-info" >Get Github Repositories</button>
  </form>
)
