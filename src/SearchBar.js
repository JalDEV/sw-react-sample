import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className='search-bar'>
      <input onChange={e => this.handleChange(e)} placeholder='Search Your Destiny' />
      </div>
    );
  }

  handleChange = (event) => {
    this.props.changeCallback(event.target.value);
  }

}

export default SearchBar;
