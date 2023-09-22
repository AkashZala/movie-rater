import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get('/api/movies');
      setMovies(data);
    }
    fetchMovies();
  }, [])

  return (
    <div>
      <h1>My Movie Rater ({movies.length})</h1>
      <ul>
        {
          movies.map(movie => {
            return (
              <li key={movie.id}>
                {`${movie.title} - ${movie.stars} stars `}
                <button>
                  +
                </button>
                <button>
                  -
                </button>
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
