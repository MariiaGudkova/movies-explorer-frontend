import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import { debounce } from "../../utils/debounce.js";
import { cardsCount } from "../../utils/constants.js";
import { cardsCountToAdd } from "../../utils/constants.js";

function MoviesCardList(props) {
  const { movies, isPageSavedMovies, onSaveMovie, onDeleteMovie } = props;
  let [itemCount, setItemCount] = React.useState(0);
  let [itemsToAddCount, setItemsToAddCount] = React.useState(0);
  const {
    CARDS_COUNT_FOR_BIG_WINDOW_SIZE,
    CARDS_COUNT_FOR_MIDDLE_WINDOW_SIZE,
    CARDS_COUNT_FOR_SMALL_WINDOW_SIZE,
  } = cardsCount;
  const { CARDS_COUNT_TO_ADD_FOR_BIG_WINDOW_SIZE, DEFAULT_CARDS_COUNT_TO_ADD } =
    cardsCountToAdd;

  React.useEffect(() => {
    function updateSize() {
      const size = window.innerWidth;
      if (size >= 769) {
        setItemCount(CARDS_COUNT_FOR_BIG_WINDOW_SIZE);
        setItemsToAddCount(CARDS_COUNT_TO_ADD_FOR_BIG_WINDOW_SIZE);
      } else if (size >= 481) {
        setItemCount(CARDS_COUNT_FOR_MIDDLE_WINDOW_SIZE);
        setItemsToAddCount(DEFAULT_CARDS_COUNT_TO_ADD);
      } else {
        setItemCount(CARDS_COUNT_FOR_SMALL_WINDOW_SIZE);
        setItemsToAddCount(DEFAULT_CARDS_COUNT_TO_ADD);
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
