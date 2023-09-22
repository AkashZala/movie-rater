import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovieForm = ({ movies, setMovies }) => {
    const [title, setTitle] = useState('');
    const [stars, setStars] = useState(0);

    const submit = async (event) => {
        event.preventDefault();
        const addMovie = { title, stars }
        const { data } = await axios.post('/api/movies', addMovie);
        setMovies([...movies, data]);
    }

    return (
        <div>
            <h2>Create New Movie Rating</h2>
            <form onSubmit={submit}>
                <label>
                    {`Title: `}
                    <input
                        name='Title'
                        type='text'
                        maxLength={'255'}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </label>
                <label>
                    {`Stars: `}
                    <input
                        name='Stars'
                        type='number'
                        min={'0'} max={'5'}
                        onChange={(event) => { setStars(event.target.value) }}
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddMovieForm;