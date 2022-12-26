import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function SavedMovies(props) {
  const { movies, isLoading, onDeleteMovie } = props;
  const isPageSavedMovies = true;

  return (
    <>
      <main className="main-container">
        <SearchForm />
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
