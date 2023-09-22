import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovieForm = ({ movies, setMovies }) => {
    const [title, setTitle] = useState('');
    const [stars, setStars] = useState(1);

    const submit = async (event) => {
        event.preventDefault();
        const addMovie = { title, stars }
        const { data } = await axios.post('/api/movies', addMovie);
        setMovies([...movies, data]);
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label>
                    Title:
                    <input type='text' maxLength={'255'} onChange={(event) => { setTitle(event.target.value) }} />
                </label>
                <label>
                    Stars:
                    <input type='number' min={'1'} max={'5'} onChange={(event) => { setStars(event.target.value) }} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddMovieForm;