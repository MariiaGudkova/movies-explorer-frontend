import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import { debounce } from "../../utils/debounce.js";

function MoviesCardList(props) {
  const { movies, isPageSavedMovies, onSaveMovie, onDeleteMovie } = props;
  let [itemCount, setItemCount] = React.useState(0);
  let [itemsToAddCount, setItemsToAddCount] = React.useState(0);

  React.useEffect(() => {
    function updateSize() {
      const size = window.innerWidth;
      if (size >= 769) {
        setItemCount(12);
        setItemsToAddCount(3);
      } else if (size >= 481) {
        setItemCount(8);
        setItemsToAddCount(2);
      } else {
        setItemCount(5);
        setItemsToAddCount(2);
      }
    }

    window.addEventListener("resize", debounce(updateSize, 500));
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function changeIncreasedItemCount() {
    setItemCount((itemCount += itemsToAddCount));
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.slice(0, itemCount).map((movie) => {
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
      {!isPageSavedMovies && itemCount < movies.length ? (
        <button
          className="movies__button"
          type="button"
          onClick={() => changeIncreasedItemCount()}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
