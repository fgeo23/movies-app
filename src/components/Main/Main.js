import MovieList from '../Movie-List/MovieList';
import './Main.scss';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Main(props) {
    const [showFilters, updateFilterState] = useState(false);
    // Here should the results be processed by genre, sorted
    const [genres, setGenres] = useState([]);
    const [selectedGenre, selectGenre] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const grabGenres = () => {
            const genres = props.results.reduce((allGenres, current) => {
                current.show.genres.forEach((genre) => {
                    if (!allGenres.includes(genre)) {
                        allGenres.push(genre);
                    }
                });
                return allGenres;
            }, []);
            setGenres(genres);
        };

        grabGenres();
    }, [props.results]);

    const filterGenre = (genre) => {
        selectGenre(genre);
    }

    function toggleFilters() {
        updateFilterState(!showFilters);
    }

    return (
        <div className="Main">
            <form className="Main-Form" onSubmit={(e) => {
                e.preventDefault();
                props.updateSearch(e.target.search.value);
                e.target.search.blur();
            }
            }>
                Search a movie or TV Show
                <input type="text" name="search" className="Main-Search" />
                <div className="Main-Controls">
                    <input type="submit" value="Search" className="btn Main-Submit" />
                    <button onClick={toggleFilters} className="btn">Filter</button>
                    {showFilters ?
                        <div className="Main-Filters">
                            <div className="Main-Filters-Genres">
                                <h4>Genre</h4>
                                {genres.map((genre, ndx) => <div key={ndx} onClick={() => filterGenre(genre)}>{genre}</div>)}
                            </div>
                            <div>
                                <h4>Release Date</h4>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div> : ''}
                </div>
            </form>
            {
                props.results.length === 0 && selectedGenre === '' ?
                    <MovieList toggleFavorite={props.toggleFavorite} checkIfFav={props.checkIfFav} results={props.results} />
                    :
                    <MovieList toggleFavorite={props.toggleFavorite} checkIfFav={props.checkIfFav} results={props.results.filter((result) => {
                        if (selectedGenre === '') {
                            return true;
                        } else {
                            return result.show.genres.includes(selectedGenre) ? true : false
                        }
                    })
                    }
                    />
            }
        </div>
    );
}

export default Main;
