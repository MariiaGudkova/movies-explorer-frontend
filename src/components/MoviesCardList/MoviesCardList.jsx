import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";

function MoviesCardList(props) {
  const { movies } = props;
  return (
    <div className="movies">
      <ul className="movies__list">
        {movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie._id} />;
        })}
      </ul>
      <button className="movies__button" type="button" onClick={() => {}}>
        Ещё
      </button>
    </div>
  );
}

export default MoviesCardList;
