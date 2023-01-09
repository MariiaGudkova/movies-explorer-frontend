import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { filterMovies, updateStoredItem } from "../../utils/utils";
import { getMovies } from "../../utils/MoviesApi";
import { getSavedMovies, saveMovie, deleteMovie } from "../../utils/MainApi";
import { errors } from "../../utils/constants";

function Movies() {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    searchStr: searchString,
    isShortFilm,
    res,
  } = JSON.parse(localStorage.getItem("lastSearch")) || {};

  const [allMovies, setAllMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState(res || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState(null);

  const searchMovies = async (searchStr, isShortFilm) => {
    try {
      if (!searchStr || searchStr.length === 0) {
        throw new Error("EMPTY_SEARCH_STRING");
      }
      setIsLoading(true);
      const jwt = localStorage.getItem("jwt");
      let movies = allMovies;
      if (!Array.isArray(movies) || movies.length === 0) {
        movies = await getMovies();
        setAllMovies(movies);
      }
      const { data: savedMovies } = await getSavedMovies(jwt, currentUser._id);
      const savedMoviesIdsMap = savedMovies.reduce((acc, savedMovie) => {
        acc[savedMovie.movieId] = savedMovie._id;
        return acc;
      }, {});
      const res = filterMovies(movies, searchStr, isShortFilm).map((movie) => ({
        ...movie,
        isSaved: Boolean(savedMoviesIdsMap[movie.id]),
        _id: savedMoviesIdsMap[movie.id],
      }));
      if (res.length === 0) {
        throw new Error("MOVIES_NOT_FOUND");
      }
      localStorage.setItem(
        "lastSearch",
        JSON.stringify({ searchStr, isShortFilm, res })
      );
      setSearchError(null);
      setSearchedMovies(res);
    } catch (e) {
      const err = Object.keys(errors).includes(e.message)
        ? e.message
        : "PROCESSING_ERROR";
      setSearchError(err);
      setSearchedMovies([]);
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const { image } = movie;
      const imageUrl = `https://api.nomoreparties.co/${image.url}`;
      const thumbnail = `https://api.nomoreparties.co/${image.url}`;
      const newMovie = { imageUrl, thumbnail, ...movie };

      const savedMovie = await saveMovie(jwt, newMovie);
      const updatedMovies = searchedMovies.map((item) => {
        if (item.id === savedMovie.data.movieId) {
          item.isSaved = true;
          item._id = savedMovie.data._id;
        }
        return item;
      });
      updateStoredItem(movie.id, true, movie._id);
      setSearchedMovies(updatedMovies);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMovie = async (movie) => {
    try {
      const jwt = localStorage.getItem("jwt");
      await deleteMovie(jwt, movie._id);
      const updatedMovies = searchedMovies.map((item) => {
        if (item._id === movie._id) {
          item.isSaved = false;
          item._id = null;
        }
        return item;
      });
      updateStoredItem(movie.id, false);
      setSearchedMovies(updatedMovies);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <main className="main-container">
        <SearchForm
          onSubmit={searchMovies}
          searchString={searchString}
          isShortFilm={isShortFilm}
          searchError={searchError}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isPageSavedMovies={false}
            movies={searchedMovies}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        )}
      </main>
    </>
  );
}

export default Movies;
