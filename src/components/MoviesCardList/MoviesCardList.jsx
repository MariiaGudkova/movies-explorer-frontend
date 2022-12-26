import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";

function MoviesCardList(props) {
  const { movies, isPageSavedMovies, onSaveMovie, onDeleteMovie } = props;
  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={isPageSavedMovies ? movie._id : movie.id}
              isPageSavedMovies={isPageSavedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
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
