import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { routes } from "../../utils/routes.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Footer from "../Footer/Footer.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound";
import { getMovies } from "../../utils/MoviesApi.js";
import {
  searchFormEmptyErrorText,
  searchFormNotFoundErrorText,
} from "../../utils/constants.js";
import {
  register,
  login,
  getUser,
  updateUser,
  saveMovie,
  getSavedMovies,
  deleteMovie,
} from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isSavedMoviesFilter, setIsSavedMoviesFilter] = React.useState(false);
  const [isSearchMovieEmptyError, setIsSearchMovieEmptyError] =
    React.useState(false);
  const [isSearchMovieNotFoundError, setIsSearchMovieNotFoundError] =
    React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesSearched, setMoviesSearched] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesSearched, setSavedMoviesSearched] = React.useState([]);
  const [serverErrorMessage, setServerErrorMessage] = React.useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = React.useState("");
  const history = useHistory();
  const nameRegex = "^[а-яА-ЯЁёa-zA-Z\\-\\s]+$";
  const emailRegex = "^\\S+@\\S+\\.\\S+$";

  React.useEffect(() => {
    if (isLogin) {
      getUserInfo();
      getMoviesInfo();
      getSavedMoviesInfo();
    }
  }, [isLogin]);

  async function handleRegistration(authData) {
    try {
      const { email, password, name } = authData;
      const response = await register(email, password, name);
      if (!response.data) {
        setServerErrorMessage(response.message);
        return;
      }
      setIsLogin(true);
      setServerErrorMessage(null);
      localStorage.setItem("jwt", response.token);
      history.push(routes.movies);
    } catch (e) {
      console.error(e);
    }
  }

  async function hanldeLogin(authData) {
    try {
      const { email, password } = authData;
      const response = await login(email, password);
      if (!response.token) {
        setServerErrorMessage(response.message);
        return;
      }
      setIsLogin(true);
      setServerErrorMessage(null);
      localStorage.setItem("jwt", response.token);
      history.push(routes.movies);
    } catch (e) {
      console.error(e);
    }
  }

  function logoutUserProfile() {
    localStorage.clear();
    history.push(routes.signIn);
    setIsLogin(false);
  }

  async function getUserInfo() {
    try {
      const jwt = localStorage.getItem("jwt");
      const userData = await getUser(jwt);
      setCurrentUser(userData.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleUpdateUser({ email, name }) {
    try {
      const jwt = localStorage.getItem("jwt");
      setIsLoading(true);
      const userData = await updateUser(jwt, email, name);
      if (!userData.data) {
        setServerErrorMessage(userData.message);
        return false;
      }
      setCurrentUser(userData.data);
      setServerSuccessMessage(userData.message);
      setServerErrorMessage(null);
      return true;
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function getMoviesInfo() {
    try {
      const moviesInfo = await getMovies();
      setAllMovies(moviesInfo);
    } catch (e) {
      console.error(e);
    }
  }

  async function getSavedMoviesInfo() {
    try {
      const jwt = localStorage.getItem("jwt");
      const moviesInfo = await getSavedMovies(jwt, currentUser._id);
      setSavedMovies(moviesInfo.data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleSearchMovie(searchData) {
    setIsLoading(true);
    let { searchString } = searchData;
    if (!searchString || searchString.length < 1) {
      setIsSearchMovieNotFoundError(false);
      setTimeout(() => {
        setIsLoading(false);
        setMoviesSearched([]);
        setIsSearchMovieEmptyError(true);
      }, 1000);
      return;
    }
    searchString = searchString.toLowerCase();
    let res = !isSavedMoviesFilter
      ? allMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchString) ||
            movie.nameEN.toLowerCase().includes(searchString) ||
            movie.country.toLowerCase().includes(searchString) ||
            movie.director.toLowerCase().includes(searchString) ||
            (movie.year.toLowerCase().includes(searchString) &&
              (!isChecked || movie.duration <= 40))
        )
      : savedMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchString) ||
            movie.nameEN.toLowerCase().includes(searchString) ||
            movie.country.toLowerCase().includes(searchString) ||
            movie.director.toLowerCase().includes(searchString) ||
            (movie.year.toLowerCase().includes(searchString) &&
              (!isChecked || movie.duration <= 40))
        );
    if (res.length < 1) {
      setIsSearchMovieEmptyError(false);
      setTimeout(() => {
        setIsLoading(false);
        !isSavedMoviesFilter
          ? setMoviesSearched([])
          : setSavedMoviesSearched([]);
        setIsSearchMovieNotFoundError(true);
      }, 1000);
      return;
    }
    setIsSearchMovieEmptyError(false);
    setIsSearchMovieNotFoundError(false);
    setTimeout(() => {
      setIsLoading(false);
      if (!isSavedMoviesFilter) {
        console.log(savedMovies);
        const savedMoviesIds = savedMovies.map((movie) => movie.movieId);
        res = res.map((movie) => ({
          ...movie,
          isSaved: savedMoviesIds.includes(movie.id),
        }));
      }

      !isSavedMoviesFilter
        ? setMoviesSearched(res)
        : setSavedMoviesSearched(res);

      if (!isSavedMoviesFilter) {
        localStorage.setItem("movies", JSON.stringify(res));
      }
    }, 1000);
  }

  async function handleSaveMovie(movie) {
    try {
      const jwt = localStorage.getItem("jwt");
      const { image } = movie;
      const imageUrl = `https://api.nomoreparties.co/${image.url}`;
      const thumbnail = `https://api.nomoreparties.co/${image.url}`;
      const newMovie = { imageUrl, thumbnail, ...movie };

      await saveMovie(jwt, newMovie);
      getSavedMoviesInfo();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      const jwt = localStorage.getItem("jwt");
      setIsLoading(true);
      await deleteMovie(jwt, movie._id);
      getSavedMoviesInfo();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path={routes.movies} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Movies
              movies={moviesSearched}
              onSearchSubmit={handleSearchMovie}
              isLoading={isLoading}
              searchFormEmptyErrorText={searchFormEmptyErrorText}
              searchFormNotFoundErrorText={searchFormNotFoundErrorText}
              isSearchMovieEmptyError={isSearchMovieEmptyError}
              setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
              isSearchMovieNotFoundError={isSearchMovieNotFoundError}
              setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
              setIsChecked={setIsChecked}
              isSavedMoviesFilter={isSavedMoviesFilter}
              setIsSavedMoviesFilter={setIsSavedMoviesFilter}
              onSaveMovie={handleSaveMovie}
            />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <SavedMovies
              movies={isSavedMoviesFilter ? savedMoviesSearched : savedMovies}
              onSearchSubmit={handleSearchMovie}
              isLoading={isLoading}
              searchFormEmptyErrorText={searchFormEmptyErrorText}
              searchFormNotFoundErrorText={searchFormNotFoundErrorText}
              isSearchMovieEmptyError={isSearchMovieEmptyError}
              setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
              isSearchMovieNotFoundError={isSearchMovieNotFoundError}
              setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
              setIsChecked={setIsChecked}
              isSavedMoviesFilter={isSavedMoviesFilter}
              setIsSavedMoviesFilter={setIsSavedMoviesFilter}
              onDeleteMovie={handleDeleteMovie}
            />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.profile} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Profile
              nameRegex={nameRegex}
              emailRegex={emailRegex}
              onLogout={logoutUserProfile}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
              serverSuccessMessage={serverSuccessMessage}
              setServerSuccessMessage={setServerSuccessMessage}
              isLoading={isLoading}
              onUpdateUser={handleUpdateUser}
            />
          </>
        </ProtectedRoute>
        <Route exact path={routes.baseRoute}>
          <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
          <Main />
          <Footer />
        </Route>
        <Route exact path={routes.signUp}>
          <Register
            onRegistrationSubmit={handleRegistration}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            serverErrorMessage={serverErrorMessage}
          />
        </Route>
        <Route exact path={routes.signIn}>
          <Login
            onLoginSubmit={hanldeLogin}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            serverErrorMessage={serverErrorMessage}
          />
        </Route>
        <Route exact path={routes.notFound}>
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
