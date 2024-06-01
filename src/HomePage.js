import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarForHome from './NavBars/NavBarForHome';
const HomePage = () => {
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      try {
        const response = await fetch(`https://www.omdbapi.com/?t=${searchQuery}&apikey=35142d57`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setMovie(null);
          setError('No movie found');
        }
      } catch (error) {
        console.error('Error fetching the movie:', error);
        setMovie(null);
        setError('Error fetching the movie');
      }
    } else {
      setError('Please enter a movie title');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (movie && movie.Title) {
      try {
        await axios.post(`http://localhost:8081/user/addMovie/${movie.Title}`);
        alert(`Movie ${movie.Title} has been added to the database`);
      } catch (error) {
        console.error('Error adding the movie to the database:', error);
        alert('Error adding the movie to the database');
      }
    } else {
      alert('Please select a movie to add');
    }
  };

  return (
    <div>
        <NavBarForHome/>
    <div className='container mt-50'>
      <div className='row'>
        <div className='col-6 offset-3'>
          <div >
            <form onSubmit={handleSearch}>
              <div className="mb-3">
                {/* <h2>Search Movie</h2> */}
                <label htmlFor="searchQuery" className="form-label"> Enter Movie Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a movie"
                />
                <button type="submit" className="btn btn-primary mt-3">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-sm-3">
          {movie && (
            <img src={movie.Poster} alt='Movie Poster' className="img-fluid" />
          )}
        </div>
        <div className="col-sm-8">
          {movie && (
            // <div className="card shadow p-2">
            <div>
              <h2>Movie Details</h2>
              <br/>
              <h1>{movie.Title}</h1>
              <p>{movie.Plot}</p>
              <p><strong>Directed by:</strong> {movie.Director}</p>
              <p><strong>Released:</strong> {movie.Released}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <button type="submit" className="btn btn-primary mt-3" onClick={handleAdd}>Add</button>
            </div>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12 text-center">
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
    </div>
  );
}


export default HomePage;
