import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import AddMovieForm from './AddMovieForm';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get('/api/movies');
      setMovies(data);
    }
    fetchMovies();
  }, [])

  const increaseStars = async (movie) => {
    try {
      setError('');
      const newRating = movie.stars + 1;
      const { data } = await axios.put(`/api/movies/${movie.id}`, { title: movie.title, stars: newRating });
      const updatedMovies = movies.map(_movie => {
        return _movie.id === movie.id ? data : _movie
      });
      setMovies(updatedMovies);
    } catch (error) {
      setError(error.response.data);
    }
  }

  const decreaseStars = async (movie) => {
    try {
      setError('');
      const newRating = movie.stars - 1;
      const { data } = await axios.put(`/api/movies/${movie.id}`, { title: movie.title, stars: newRating });
      const updatedMovies = movies.map(_movie => {
        return _movie.id === movie.id ? data : _movie
      });
      setMovies(updatedMovies);
    } catch (error) {
      setError(error.response.data);
    }
  }

  const deleteMovie = async (movie) => {
    try {
      const response = await axios.delete(`/api/movies/${movie.id}`);
      const updatedList = movies.filter(_movie => {
        return _movie.id !== movie.id;
      });
      setMovies(updatedList);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div>
      <h1>My Movie Rater ({movies.length})</h1>
      <AddMovieForm movies={movies} setMovies={setMovies} />
      <p>{error}</p>
      <ul>
        {
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <p>{`${movie.title} - ${movie.stars} stars `}
                  <button onClick={() => { increaseStars(movie) }}>
                    +
                  </button>
                  <button onClick={() => { decreaseStars(movie) }}>
                    -
                  </button>
                </p>
                <div>
                  <button onClick={() => { deleteMovie(movie) }}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
