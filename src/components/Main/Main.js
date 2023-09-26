import MovieList from '../Movie-List/MovieList';
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';
import './Main.scss';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/***
 * Main component handles search, filtering and sorting for the results
 * Renders the Movie list based on the returned results
 */

function Main(props) {
    const [showFilters, updateFilterState] = useState(false);
    const [showSorting, updateSortingState] = useState(false);
    // Here should the results be processed by genre, sorted
    const [genres, setGenres] = useState([]);
    const [selectedGenre, selectGenre] = useState('');
    const [selectedSortMethod, selectSort] = useState('');
    const [startDate, setStartDate] = useState(new Date('2000-01-01'));
    const [endDate, setEndDate] = useState(new Date());

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

    // Handle the filter status and the sort status
    const filterGenre = (genre) => {
        selectGenre(genre);
    }

    const selectSortMethod = (method) => {
        selectSort(method);
    }

    function toggleFilters() {
        updateFilterState(!showFilters);
    }

    function toggleSorting() {
        updateSortingState(!showSorting);
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
                    <button onClick={toggleFilters} className={"btn Main-Filters-Button " + (showFilters ? 'selected' : '')}>Filter</button>
                    <button onClick={toggleSorting} className={"btn Main-Sorting-Button " + (showSorting ? 'selected' : '')}>Sort</button>
                </div>
                {showFilters ?
                    // Render the genres and if the genre is selected display it different from the others using the .selected class
                    <div className="Main-Filters">
                        <h4>Genre</h4>
                        <div className="Main-Filters-Genres">
                            <div className={`control ${selectedGenre === '' ? 'selected' : ''}`} key='all' onClick={() => filterGenre('')}>All</div>
                            {genres.map((genre, ndx) => {
                                return <div className={`control ${selectedGenre === genre ? 'selected' : ''}`} key={ndx} onClick={() => filterGenre(genre)}>{genre}</div>
                            })}
                        </div>
                        <h4>Release Date</h4>
                        <div className="Main-Filters-DatePickers">
                            <DatePicker dateFormat="dd-MM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} title="Start Date" />
                            until
                            <DatePicker dateFormat="dd-MM-yyyy" selected={endDate} onChange={(date) => setEndDate(date)} title="End Date" />
                        </div>
                    </div> : ''}
                {showSorting ?
                    // Choose the sorting method and display the selected method different from the others
                    <div className="Main-Sorting">
                        <div className={`control ${selectedSortMethod === '' ? 'selected' : ''}`} onClick={() => selectSortMethod('')}>Unsorted</div>
                        <div className={`control ${selectedSortMethod === 'name' ? 'selected' : ''}`} onClick={() => selectSortMethod('name')}>Name</div>
                        <div className={`control ${selectedSortMethod === 'year' ? 'selected' : ''}`} onClick={() => selectSortMethod('year')}>Year of release</div>
                    </div>
                : ''}
            </form>
            {
                props.results.length === 0 && selectedGenre === '' ?
                    <MovieList toggleFavorite={props.toggleFavorite} checkIfFav={props.checkIfFav} results={props.results} />
                    :
                    <MovieList toggleFavorite={props.toggleFavorite} checkIfFav={props.checkIfFav} results={props.results.filter((result) => {
                        let movieDate = new Date(result.show.premiered);
                        if ((selectedGenre === '' || result.show.genres.includes(selectedGenre)) && (movieDate > startDate && movieDate < endDate)) {
                            return true;
                        } else {
                            return false;
                        }
                    }).sort((prev, next) => {
                        // Simple array sort methods
                        switch (selectedSortMethod) {
                            case 'year':
                                let prevDate = new Date(prev.show.premiered);
                                let nextDate = new Date(next.show.premiered);
                                if (prevDate < nextDate) {
                                    return 1;
                                }
                                if (prevDate > nextDate) {
                                    return -1;
                                }
                                return 0;
                            case 'name':
                                if (prev.show.name < next.show.name) {
                                    return -1;
                                }
                                if (prev.show.name > next.show.name) {
                                    return 1;
                                }
                                return 0;
                            default: return 1;
                        }
                    })
                    }
                    />
            }
            <RecentlyViewed />
        </div>
    );
}

export default Main;
