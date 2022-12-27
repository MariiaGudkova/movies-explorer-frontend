import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function SavedMovies(props) {
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
    onDeleteMovie,
  } = props;
  const isPageSavedMovies = true;

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
          isSavedMoviesFilter={isSavedMoviesFilter}
          setIsSavedMoviesFilter={setIsSavedMoviesFilter}
          isPageSavedMovies={isPageSavedMovies}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            isPageSavedMovies={isPageSavedMovies}
            onDeleteMovie={onDeleteMovie}
          />
        )}
      </main>
    </>
  );
}

export default SavedMovies;
