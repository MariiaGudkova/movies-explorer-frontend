import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function Movies(props) {
  const {
    movies,
    onSearchSubmit,
    searchFormEmptyErrorText,
    searchFormNotFoundErrorText,
    isSearchFilmEmptyError,
    isSearchFilmNotFoundError,
  } = props;
  return (
    <>
      <main className="main-container">
        <SearchForm
          onSearchSubmit={onSearchSubmit}
          searchFormEmptyErrorText={searchFormEmptyErrorText}
          searchFormNotFoundErrorText={searchFormNotFoundErrorText}
          isSearchFilmEmptyError={isSearchFilmEmptyError}
          isSearchFilmNotFoundError={isSearchFilmNotFoundError}
        />
        <MoviesCardList movies={movies} />
        {/* <Preloader /> */}
      </main>
    </>
  );
}

export default Movies;
