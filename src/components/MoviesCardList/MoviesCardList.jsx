import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";

function MoviesCardList(props) {
  const { movies, isPageSavedMovies } = props;
  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.id}
              isPageSavedMovies={isPageSavedMovies}
            />
          );
        })}
      </ul>
      <button className="movies__button" type="button" onClick={() => {}}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
