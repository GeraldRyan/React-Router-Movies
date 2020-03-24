import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const Movie = (props) =>
{
  const [movie, setMovie] = useState();

  const params = useParams();
  // console.log("params", params)


    useEffect(() =>
    {

      const id = 2
      // change ^^^ that line and grab the id from the URL
      // You will NEED to add a dependency array to this effect hook

      // just need to transfer this ${id} expression into the proper numeric value and we're done.
      console.log("params",params, params.id)
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(response =>
        {
          setMovie(response.data);
        })
        .catch(error =>
        {
          console.error(error);
        });

    }, []);  // why do we want to call the API AFTER we render the function? That makes little sense. I see. It loops back. It renders "loading" or whatever- and then this effect runs and that triggers a state change. Clever but this was not spelled out. I'm truly a genius for figuring it out. That's why it runs twice also why I had the error before. Great. So that riddle is solved. I think anyway. This API response will (should) trigger a re-render. Ach so. So deska.  So does this mean after it rerenders with the new API response data, that it calls the API again? That woudl be a waste? That would be reduntant. The UseEffect on the front end would sovle sync issues but on the backend would result in one unnecessary API call, right? And if the data from the API changes slighly over time, like ever part second or whatever, could that not cause an infinite loop? Yes and that is validated here:https://stackoverflow.com/questions/56367452/why-does-react-hooks-axios-api-call-return-twice

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = () => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }

  if (!movie)
  {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
    </div>
  );
}

export default Movie;
