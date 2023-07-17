import React, { useEffect, useState } from "react";
import './card.css';
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Cards = ({movie}) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        setTimeout(() =>{
            setLoading(false);
        },1500);
    }, []);

    return <>
    {
        isLoading ? 
        <div className="cards">
            <SkeletonTheme BaseColor="#202020" highlightColor="#444">
                    <Skeleton height={300} duration={2} count={5}/>
                </SkeletonTheme>
        </div>
        :
        <Link style={{textDecoration:'none', color:'white'}} to={`/movie/${movie.id}`}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}></img>
                <div className="cards__overlay">
                    <div className="card__title">
                        {movie ? movie.original_title : ""}
                    </div>
                    <div className="card__runtime">
                        {movie ? movie.release_date : ""}
                        <span 
                            className="card__rating">{movie?movie.vote_average:""}
                            <i className="fa fa-star" /> 
                        </span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}
                    </div>
                </div>
            </div>
            
        </Link>
    }
    </>
}

export default Cards;