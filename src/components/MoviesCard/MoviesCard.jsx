import "./MoviesCard.css";
import checkMark from "../../images/checkmark.svg";
import deleteIcon from "../../images/delete-icon.svg";

function MoviesCard(props) {
  const { movie, isPageSavedMovies } = props;
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

  return (
    <li className="movie">
      <div className="movie__signature">
        <h2 className="movie__title">{movie.title}</h2>
        <p className="movie__duration">{movie.duration}</p>
      </div>
      <img className="movie__cover" src={movie.cover} alt={movie.title} />
      <button className={saveButtonClassName} type="button" onClick={() => {}}>
        {saveButtonText}
      </button>
    </li>
  );
}

export default MoviesCard;
