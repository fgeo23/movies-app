import './MovieItem.scss';
import DOMPurify from "dompurify";

import { useState, useEffect } from 'react';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

// Renders the data for a show
function MovieItem(props) {
    const [showMore, setShowMore] = useState(false);
    const [isFavorite, setFavorite] = useState(false);

    // Sanitizing the HTML to prevent XSS
    const safeHTML = DOMPurify.sanitize(props.movie.summary, {
        ALLOWED_TAGS: ["h1", "p", "span", "b"],
    });

    const movieID = props.movie.id;

    // Sets the favorite status of a show, if the result is present in the favorites updates the star to display in a gold color
    useEffect(() => {
        const checkIfFavorite = () => {
            if (props.checkIfFav(props.movie.id)) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }
        };

        checkIfFavorite();
    }, [props, movieID]);

    return (
        <div className="Movie-Item">
            <div className="Movie-Title">
                <h5>{props.movie.name}</h5>
                <div className="add-to-fav" onClick={() => {
                    setFavorite(!isFavorite);
                    props.toggleFavorite(props.movie.id);
                    return;
                }}>
                    {isFavorite ? <AiFillStar color='gold' /> : <AiOutlineStar />}
                </div>
            </div>
            <div className="Movie-Image">
            {
                props.movie.image ?
                <img src={props.movie.image.medium} alt="" />
                :
                <img src="https://via.placeholder.com/210x295?text=No+Movie+Poster" alt="" />
            }
            </div>
            <div className="Movie-Desc">
                <div className={`description-text ${showMore ? "show-more" : ""}`} dangerouslySetInnerHTML={{ __html: safeHTML }} ></div>
                {
                    // Could be improved by setting the number based on the words on screen
                    safeHTML.length > 200 ?
                        <button className="btn btn--show-more" onClick={() => setShowMore(!showMore)}>
                            {showMore ? "Show less" : "Show more"}
                        </button>
                        : ""
                }
                {props.movie.genres.length > 0 ?
                    <div className="Movie-Genres">
                        <b>Genres</b>
                        {props.movie.genres.map((genre, ndx) => {
                            return <div className="genre" key={ndx}>{genre}</div>
                        })}
                    </div>
                    : ''}
            </div>
            <div className="Movie-Details">
                <div>Premiered: {props.movie.premiered}</div>
                {props.movie.rating.average ? <div>Rating: {props.movie.rating.average} / 10</div> : ""}
            </div>
        </div>
    );
}

export default MovieItem;
