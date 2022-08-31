import MovieItem from './Movie-Item/MovieItem';
import './MovieList.scss';

function MovieList(props) {
    return (
        <div className="movie-list">
            {
                props.results.map((result, index) => {
                    return <MovieItem key={index} movie={result.show} checkIfFav={props.checkIfFav} toggleFavorite={props.toggleFavorite}/>;
                })
            }
        </div>
    );
}

export default MovieList;
