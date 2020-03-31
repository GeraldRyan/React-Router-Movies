import React from 'react';
import { Link } from 'react-router-dom'

const SavedList = props => (
  <Link to='/'>
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <span className="saved-movie">{movie.title}</span>
      ))}
      <div className="home-button">Home</div>
    </div>
  </Link>
);

export default SavedList;
