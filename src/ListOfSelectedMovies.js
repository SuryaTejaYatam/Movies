import axios from 'axios';
import React, { useEffect, useState } from "react";
import NavBarForMovieList from "./NavBars/NavBarForMovieList";
const ListOfSelectedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8081/user/findAllAddedMovies");
      const data = response.data;

      // Ensure the response is an array of objects with a title field
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format. Expected an array of movie objects.");
      }

      const titles = data.map(movie => movie.title);

      const movieDetails = await Promise.all(titles.map(async (title) => {
        try {
          const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=35142d57`);
          const data = await response.json();
          if (data.Response === 'True') {
            return data;
          } else {
            console.error(`Error fetching movie details for ${title}: ${data.Error}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching movie details for ${title}:`, error);
          return null;
        }
      }));

      setMovies(movieDetails.filter(movie => movie !== null));
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <NavBarForMovieList/>
        <br/>
      <div className="container">
        <center><h2>List of Selected Movies</h2></center>
        <br/>
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <div className="card shadow p-3">
              <div className="row mt-1">
              <div className="col-sm-3">
          {movie && (
            <img src={movie.Poster} alt='Movie Poster' className="img-fluid" />
          )}
              </div>
              <div className="col-sm-10">
                <h2>Movie Details</h2>
                <br />
                <h1>{movie.Title}</h1>
                <p>{movie.Plot}</p>
                <p><strong>Directed by:</strong> {movie.Director}</p>
                <p><strong>Released:</strong> {movie.Released}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                </div>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListOfSelectedMovies;
