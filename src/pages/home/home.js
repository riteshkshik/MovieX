import React, { useEffect, useState } from "react";
import './home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MoviesList from "../../components/moviesList/moviesList";

const Home = () =>{

    const [popularMovies, setPopularMovies] = useState([]);


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=49836ecf1c467eb9fe5d4c52eaf7007b&language=en-US')
            .then(res => res.json())
            .then(data => setPopularMovies(data.results));
    }, []);

    return (
        <>
            <div className="poster">
                {
                    popularMovies.length > 0 ? (
                        <Carousel 
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
                        infiniteLoop={true}
                        showStatus={false}
                        >
                            {
                                popularMovies.map(movie => (
                                    <Link style={{textDecoration:'none', color:'white'}} to={`/movie/${movie.id}`}>
                                        <div className="posterImage">
                                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}></img>
                                        </div>
                                        <div className="posterImage__overlay">
                                            <div className="posterImage__title">{movie.original_title}</div>
                                            <div className="posterImage__runtime">
                                                {movie ? movie.release_date : ""}
                                                <span className="posterImage__rating">
                                                    {movie ? movie.vote_average: ""}
                                                    <i className="fa fa-star" />{" "}
                                                </span>
                                            </div>
                                            <div className="posterImage__description">{movie ? movie.overview: ""}</div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </Carousel>
                    ): (
                        <div>Loading...</div>
                    )
                }
            </div>

            <MoviesList />
        </>
    )
}

export default Home