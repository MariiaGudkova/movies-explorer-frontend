import "./MoviesCard.css";
import checkMark from "../../images/checkmark.svg";
import deleteIcon from "../../images/delete-icon.svg";

function MoviesCard(props) {
  const { movie, isPageSavedMovies, onSaveMovie, onDeleteMovie } = props;
  const { nameRU, duration, image, trailerLink } = movie;
  let saveButtonClassName = `movie__save-button ${
    movie.isSaved ? "movie__save-button_active" : ""
  }`;
  let saveButtonText =
    saveButtonClassName === "movie__save-button movie__save-button_active" ? (
      <img src={checkMark} alt="Checkmark" />
    ) : (
      "Сохранить"
    );

  if (isPageSavedMovies) {
    saveButtonClassName = "movie__delete-button";
    saveButtonText = <img src={deleteIcon} alt="Cross" />;
  }

  let imageSrc = isPageSavedMovies
    ? image
    : `https://api.nomoreparties.co/${image.url}`;

  function onClick() {
    movie.isSaved || isPageSavedMovies
      ? onDeleteMovie(movie)
      : onSaveMovie(movie);
  }

  return (
    <li className="movie">
      <div className="movie__signature">
        <h2 className="movie__title">{nameRU}</h2>
        <p className="movie__duration">{duration}</p>
      </div>
      <a
        href={trailerLink}
        className="movie__trailer-link"
        target="_blank"
        rel="noreferrer"
      >
        <img className="movie__cover" src={imageSrc} alt={nameRU} />
      </a>
      <button className={saveButtonClassName} type="button" onClick={onClick}>
        {saveButtonText}
      </button>
    </li>
  );
}

export default MoviesCard;
