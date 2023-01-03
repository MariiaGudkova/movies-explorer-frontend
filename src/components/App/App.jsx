import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
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
  const [serverErrors, setServerErrors] = React.useState({});
  const [serverSuccessMessage, setServerSuccessMessage] = React.useState("");
  const [searchString, setSearchString] = React.useState("");
  const history = useHistory();
  const location = useLocation();
  const nameRegex = "^[а-яА-ЯЁёa-zA-Z\\-\\s]+$";
  const emailRegex = "^\\S+@\\S+\\.\\S+$";

  React.useEffect(() => {
    if (isLogin) {
      getUserInfo();
      getMoviesInfo();
      getSavedMoviesInfo();
    }
  }, [isLogin]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    handleSearchMovie();
  }, [isChecked, searchString]);

  async function handleRegistration(authData) {
    try {
      const { email, password, name } = authData;
      const response = await register(email, password, name);
      if (!response.data) {
        setServerErrors({ ...serverErrors, registration: response.message });
        return;
      }
      setIsLogin(true);
      setServerErrors({ ...serverErrors, registration: null });
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
        setServerErrors({ ...serverErrors, login: response.message });
        return;
      }
      setIsLogin(true);
      setServerErrors({ ...serverErrors, login: null });
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
    setMoviesSearched([]);
    setSearchString("");
    setIsChecked(false);
  }

  function tokenCheck() {
    const prevPath = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUser(jwt)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            history.push(prevPath);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
      const response = await updateUser(jwt, email, name);
      if (!response.data) {
        setServerErrors({ ...serverErrors, profile: response.message });
        return false;
      }
      setCurrentUser(response.data);
      setServerSuccessMessage(response.message);
      setServerErrors({ ...serverErrors, profile: null });
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

  function handleSearchMovie() {
    console.log(searchString);
    setIsLoading(true);
    if (!searchString || searchString.length < 1) {
      setIsSearchMovieNotFoundError(false);
      setTimeout(() => {
        setIsLoading(false);
        setMoviesSearched([]);
        setIsSearchMovieEmptyError(true);
      }, 1000);
      return;
    }
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
    console.log(res);
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
        const savedMoviesIds = savedMovies.map((movie) => movie.movieId);
        res = res.map((movie) => ({
          ...movie,
          isSaved: savedMoviesIds.includes(movie.id),
          _id: savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
            ?._id,
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
      setIsLoading(true);
      const jwt = localStorage.getItem("jwt");
      const { image } = movie;
      const imageUrl = `https://api.nomoreparties.co/${image.url}`;
      const thumbnail = `https://api.nomoreparties.co/${image.url}`;
      const newMovie = { imageUrl, thumbnail, ...movie };

      const savedMovie = await saveMovie(jwt, newMovie);
      const updatedMovies = moviesSearched.map((item) => {
        if (item.id === savedMovie.data.movieId) {
          item.isSaved = true;
          item._id = savedMovie.data._id;
        }
        return item;
      });
      setMoviesSearched(updatedMovies);
      getSavedMoviesInfo();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      const jwt = localStorage.getItem("jwt");
      setIsLoading(true);
      await deleteMovie(jwt, movie._id);
      getSavedMoviesInfo();
      const updatedMovies = moviesSearched.map((item) => {
        if (item._id === movie._id) {
          item.isSaved = false;
          item._id = null;
        }
        return item;
      });
      setMoviesSearched(updatedMovies);
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
              isLoading={isLoading}
              searchFormEmptyErrorText={searchFormEmptyErrorText}
              searchFormNotFoundErrorText={searchFormNotFoundErrorText}
              isSearchMovieEmptyError={isSearchMovieEmptyError}
              setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
              isSearchMovieNotFoundError={isSearchMovieNotFoundError}
              setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
              setIsChecked={setIsChecked}
              setSearchString={setSearchString}
              isSavedMoviesFilter={isSavedMoviesFilter}
              setIsSavedMoviesFilter={setIsSavedMoviesFilter}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <SavedMovies
              movies={isSavedMoviesFilter ? savedMoviesSearched : savedMovies}
              isLoading={isLoading}
              searchFormEmptyErrorText={searchFormEmptyErrorText}
              searchFormNotFoundErrorText={searchFormNotFoundErrorText}
              isSearchMovieEmptyError={isSearchMovieEmptyError}
              setIsSearchMovieEmptyError={setIsSearchMovieEmptyError}
              isSearchMovieNotFoundError={isSearchMovieNotFoundError}
              setIsSearchMovieNotFoundError={setIsSearchMovieNotFoundError}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              setSearchString={setSearchString}
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
              serverError={serverErrors.profile}
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
            serverError={serverErrors.registration}
          />
        </Route>
        <Route exact path={routes.signIn}>
          <Login
            onLoginSubmit={hanldeLogin}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            serverError={serverErrors.login}
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
