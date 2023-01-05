const SHORT_FILM_LENGTH_MINUTES = 40;
export function filterMovies(allMovies, searchStr, isShortFilm) {
  return allMovies.filter((movie) => {
    return [
      "nameRU", 
      "nameEN", 
      "country", 
      "director", 
      "year"
    ].some((field) => 
      movie[field]?.toLowerCase().includes(searchStr?.toLowerCase())
    )
    && (!isShortFilm || movie.duration <= SHORT_FILM_LENGTH_MINUTES);
  });
}

export function updateStoredItem(movieId, isSaved, savedMovieId) {
  const storedData = JSON.parse(localStorage.getItem("lastSearch"));
  if (!storedData) {
    return;
  }
  const {res} = storedData;
  const updatedData = res.map(movie => {
    if (movie.id === movieId) {
      movie.isSaved = isSaved;
      movie._id = savedMovieId;
    }
    return movie;
  });
  localStorage.setItem("lastSearch", JSON.stringify({...storedData, res: updatedData}));
}