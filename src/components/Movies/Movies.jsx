import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";

function Movies(props) {
  const { movies } = props;
  return (
    <>
      <main className="main-container">
        <SearchForm />
        <MoviesCardList movies={movies} />
        {/* <Preloader /> */}
      </main>
    </>
  );
}

export default Movies;
