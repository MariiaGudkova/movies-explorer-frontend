import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function SavedMovies(props) {
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
    onDeleteMovie,
  } = props;
  const isPageSavedMovies = true;

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
