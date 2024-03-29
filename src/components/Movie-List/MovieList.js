import MovieItem from '../Movie-Item/MovieItem';
import './MovieList.scss';

function MovieList(props) {
    return (
        <div className="Movie-List">
            {
                props.results.map((result, index) => {
                    return <MovieItem key={result.id + `${index}`} movie={result.show} checkIfFav={props.checkIfFav} toggleFavorite={props.toggleFavorite}/>;
                })
            }
        </div>
    );
}

export default MovieList;
