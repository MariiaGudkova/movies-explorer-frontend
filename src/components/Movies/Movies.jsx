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
    isSearchFilmEmptyError,
    setIsSearchFilmEmptyError,
    isSearchFilmNotFoundError,
    setIsSearchFilmNotFoundError,
    setIsChecked,
  } = props;
  return (
    <>
      <main className="main-container">
        <SearchForm
          onSearchSubmit={onSearchSubmit}
          searchFormEmptyErrorText={searchFormEmptyErrorText}
          searchFormNotFoundErrorText={searchFormNotFoundErrorText}
          isSearchFilmEmptyError={isSearchFilmEmptyError}
          setIsSearchFilmEmptyError={setIsSearchFilmEmptyError}
          isSearchFilmNotFoundError={isSearchFilmNotFoundError}
          setIsSearchFilmNotFoundError={setIsSearchFilmNotFoundError}
          setIsChecked={setIsChecked}
        />
        {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
      </main>
    </>
  );
}

export default Movies;
