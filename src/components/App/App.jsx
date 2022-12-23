import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { routes } from "../../utils/routes.js";
import Header from "../Header/Header.jsx";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile";
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
} from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesSearched, setMoviesSearched] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchFilmEmptyError, setIsSearchFilmEmptyError] =
    React.useState(false);
  const [isSearchFilmNotFoundError, setIsSearchFilmNotFoundError] =
    React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState("");
  // const alreadySavedMovies = allMovies.filter(
  //   (movie) => movie.isSaved === true
  // );
  const nameRegex = "^[а-яА-ЯЁёa-zA-Z\\-\\s]+$";
  const emailRegex = "^\\S+@\\S+\\.\\S+$";
  const history = useHistory();

  React.useEffect(() => {
    if (isLogin) {
      getUserInfo();
      getMoviesInfo();
      getSavedMoviesInfo();
    }
  }, [isLogin]);

  async function handleRegistration(authData) {
    const { email, password, name } = authData;
    const response = await register(email, password, name);
    if (!response.data) {
      setServerErrorMessage(response.message);
      return;
    }
    setIsLogin(true);
    localStorage.setItem("jwt", response.token);
    history.push(routes.movies);
  }

  async function hanldeLogin(authData) {
    const { email, password } = authData;
    const response = await login(email, password);
    if (!response.token) {
      setServerErrorMessage(response.message);
      return;
    }
    setIsLogin(true);
    localStorage.setItem("jwt", response.token);
    history.push(routes.movies);
  }

  function logoutUserProfile() {
    localStorage.removeItem("jwt");
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
      setCurrentUser(userData.data);
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
      setIsSearchFilmNotFoundError(false);
      setTimeout(() => {
        setIsLoading(false);
        setMoviesSearched([]);
        setIsSearchFilmEmptyError(true);
      }, 1000);
      return;
    }
    console.log(allMovies);
    searchString = searchString.toLowerCase();
    const res = allMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchString) ||
        movie.nameEN.toLowerCase().includes(searchString) ||
        movie.country.toLowerCase().includes(searchString) ||
        movie.director.toLowerCase().includes(searchString) ||
        (movie.year.toLowerCase().includes(searchString) &&
          (!isChecked || movie.duration <= 40))
    );
    if (res.length < 1) {
      setIsSearchFilmEmptyError(false);
      setTimeout(() => {
        setIsLoading(false);
        setMoviesSearched([]);
        setIsSearchFilmNotFoundError(true);
      }, 1000);
      return;
    }
    setIsSearchFilmEmptyError(false);
    setIsSearchFilmNotFoundError(false);
    setTimeout(() => {
      setIsLoading(false);
      setMoviesSearched(res);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path={routes.movies} loggedIn={isLogin}>
          <>
            <Header
              isLogin={isLogin}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onLogoutProfile={logoutUserProfile}
            />
            <Movies
              movies={moviesSearched}
              onSearchSubmit={handleSearchMovie}
              isLoading={isLoading}
              searchFormEmptyErrorText={searchFormEmptyErrorText}
              searchFormNotFoundErrorText={searchFormNotFoundErrorText}
              isSearchFilmEmptyError={isSearchFilmEmptyError}
              setIsSearchFilmEmptyError={setIsSearchFilmEmptyError}
              isSearchFilmNotFoundError={isSearchFilmNotFoundError}
              setIsSearchFilmNotFoundError={setIsSearchFilmNotFoundError}
              setIsChecked={setIsChecked}
              onSaveMovie={handleSaveMovie}
            />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogin}>
          <>
            <Header
              isLogin={isLogin}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onLogoutProfile={logoutUserProfile}
            />
            <SavedMovies movies={savedMovies} />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.profile} loggedIn={isLogin}>
          <>
            <Header
              isLogin={isLogin}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onLogoutProfile={logoutUserProfile}
            />
            <Profile
              nameRegex={nameRegex}
              emailRegex={emailRegex}
              onLogout={logoutUserProfile}
              serverErrorMessage={serverErrorMessage}
              isLoading={isLoading}
              onUpdateUser={handleUpdateUser}
            />
          </>
        </ProtectedRoute>
        <Route exact path={routes.baseRoute}>
          <Header isLogin={isLogin} />
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
