import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function Movies(props) {
  const {
    movies,
    isLoading,
    searchFormEmptyErrorText,
    searchFormNotFoundErrorText,
    isSearchMovieEmptyError,
    setIsSearchMovieEmptyError,
    isSearchMovieNotFoundError,
    setIsSearchMovieNotFoundError,
    setIsChecked,
    setSearchString,
    isSavedMoviesFilter,
    setIsSavedMoviesFilter,
    onSaveMovie,
    onDeleteMovie,
  } = props;
  const isPageSavedMovies = false;

  return (
    <>
      <main className="main-container">
        <SearchForm
          searchFormEmptyErrorText={searchFormEmptyErrorText}
          searchFormNotFoundErrorText={searchFormNotFoundErrorText}
          isSearchMovieEmptyError={isSearchMovieEmptyError}
          setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
          isSearchMovieNotFoundError={isSearchMovieNotFoundError}
          setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
          setIsChecked={setIsChecked}
          setSearchString={setSearchString}
          isPageSavedMovies={isPageSavedMovies}
          isSavedMoviesFilter={isSavedMoviesFilter}
          setIsSavedMoviesFilter={setIsSavedMoviesFilter}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        )}
      </main>
    </>
  );
}

export default Movies;
