import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import {
  getSavedMovies as getSavedMoviesApi,
  deleteMovie,
} from "../../utils/MainApi";
import { filterMovies, updateStoredItem } from "../../utils/utils";
import { errors } from "../../utils/constants";

function SavedMovies() {
  const currentUser = React.useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState(null);

  React.useEffect(() => {
    getSavedMovies();
  }, []);

  const getSavedMovies = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const { data: res } = await getSavedMoviesApi(jwt, currentUser._id);
      setSavedMovies(res);
      setSearchedMovies(res);
    } catch (e) {
      setSearchError("PROCESSING_ERROR");
    }
  };

  const searchMovies = async (searchStr, isShortFilm) => {
    try {
      if (!searchStr || searchStr.length === 0) {
        throw new Error("EMPTY_SEARCH_STRING");
      }
      setIsLoading(true);
      const res = filterMovies(savedMovies, searchStr, isShortFilm);
      if (res.length === 0) {
        throw new Error("MOVIES_NOT_FOUND");
      }
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

  const handleDeleteMovie = async (movie) => {
    try {
      const jwt = localStorage.getItem("jwt");
      await deleteMovie(jwt, movie._id);
      const updatedSearchedMovies = searchedMovies.filter(
        (item) => item._id !== movie._id
      );
      const updatedSavedMovies = savedMovies.filter(
        (item) => item._id !== movie._id
      );
      setSearchedMovies(updatedSearchedMovies);
      setSavedMovies(updatedSavedMovies);
      updateStoredItem(movie.movieId, false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <main className="main-container">
        <SearchForm
          onSubmit={searchMovies}
          searchString={""}
          isShortFilm={false}
          searchError={searchError}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={searchedMovies}
            isPageSavedMovies
            onDeleteMovie={handleDeleteMovie}
          />
        )}
      </main>
    </>
  );
}

export default SavedMovies;
