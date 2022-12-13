import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

function SavedMovies(props) {
  const { movies } = props;
  const isPageSavedMovies = true;

  return (
    <>
      <SearchForm />
      <MoviesCardList movies={movies} isPageSavedMovies={isPageSavedMovies} />
    </>
  );
}

export default SavedMovies;
