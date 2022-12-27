import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function Movies(props) {
  const {
    movies,
    onSearchSubmit,
    isLoading,
    searchFormEmptyErrorText,
    searchFormNotFoundErrorText,
    isSearchMovieEmptyError,
    setIsSearchMovieEmptyError,
    isSearchMovieNotFoundError,
    setIsSearchMovieNotFoundError,
    setIsChecked,
    isSavedMoviesFilter,
    setIsSavedMoviesFilter,
    onSaveMovie,
  } = props;
  const isPageSavedMovies = false;

  return (
    <>
      <main className="main-container">
        <SearchForm
          onSearchSubmit={onSearchSubmit}
          searchFormEmptyErrorText={searchFormEmptyErrorText}
          searchFormNotFoundErrorText={searchFormNotFoundErrorText}
          isSearchMovieEmptyError={isSearchMovieEmptyError}
          setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
          isSearchMovieNotFoundError={isSearchMovieNotFoundError}
          setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
          setIsChecked={setIsChecked}
          isPageSavedMovies={isPageSavedMovies}
          isSavedMoviesFilter={isSavedMoviesFilter}
          setIsSavedMoviesFilter={setIsSavedMoviesFilter}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} />
        )}
      </main>
    </>
  );
}

export default Movies;
