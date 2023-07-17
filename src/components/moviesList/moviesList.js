import React, { useEffect, useState } from "react";
import './moviesList.css';
import { useParams } from "react-router-dom";
import Cards from "../card/card";


const MoviesList = () => {
    const [moviesList, setMoviesList] = useState([]);
    const {type} = useParams();

    useEffect(() => {
        getData();
    },[]);

    useEffect(() =>{
        getData();
    }, [type]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=49836ecf1c467eb9fe5d4c52eaf7007b&language=en-US`)
            .then(res => res.json())
            .then(data => setMoviesList(data.results));
    }


    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type: "popular").toUpperCase}</h2>
            <div className="list__card">
                {
                    moviesList.map(movie => {
                        return <Cards movie={movie} />
                    })
                }
            </div>
        </div>
    )
}

export default MoviesList