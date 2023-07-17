import React, { useEffect, useState } from "react";
import './movieDetail.css';
import { useParams } from "react-router-dom";


const MovieDetail = () =>{
    const [currMovieDetail, setCurrMovieDetail] = useState('');
    const { id } = useParams();

    useEffect(() =>{
        getMovieData()
    }, []);

    const getMovieData = () =>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=49836ecf1c467eb9fe5d4c52eaf7007b&language=en-US`)
            .then(res => res.json())
            .then(data => setCurrMovieDetail(data));    
    }


    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currMovieDetail ? currMovieDetail.backdrop_path : ""}`}/>
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img src={`https://image.tmdb.org/t/p/original${currMovieDetail ? currMovieDetail.poster_path : ""}`} alt="" className="movie__poster" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currMovieDetail ? currMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currMovieDetail ? currMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currMovieDetail ? currMovieDetail.vote_average: ""} <i className="fa fa-star" />
                            <span className="movie__voteCount">{currMovieDetail ? "(" + currMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currMovieDetail ? currMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currMovieDetail ? "Release date: " + currMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currMovieDetail && currMovieDetail.genres ?
                                currMovieDetail.genres.map(genre =>(
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                ))
                                : ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currMovieDetail ? currMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currMovieDetail && currMovieDetail.homepage && <a href={currMovieDetail.homepage} target="_blank" style={{textDecoration:"none", fontSize: "1.2rem"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currMovieDetail && currMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none", fontSize: "1.2rem"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production Companies</div>
            <div className="movie__production">
                {
                    currMovieDetail && currMovieDetail.production_companies && currMovieDetail.production_companies.map(
                        company => (
                            <>{
                                company.logo_path
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                </span>
                            }
                            </>
                        )
                    )
                }
            </div>
        </div>
    )

}

export default MovieDetail;