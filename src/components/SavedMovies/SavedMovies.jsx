import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

function SavedMovies(props) {
  const { movies, onDeleteMovie } = props;
  const isPageSavedMovies = true;

  return (
    <>
      <main className="main-container">
        <SearchForm />
        <MoviesCardList
          movies={movies}
          isPageSavedMovies={isPageSavedMovies}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
    </>
  );
}

export default SavedMovies;
