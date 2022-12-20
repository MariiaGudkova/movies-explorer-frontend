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

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesSearched, setMoviesSearched] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchFilmEmptyError, setIsSearchFilmEmptyError] =
    React.useState(false);
  const [isSearchFilmNotFoundError, setIsSearchFilmNotFoundError] =
    React.useState(false);
  const savedMovies = allMovies.filter((movie) => movie.isSaved === true);
  const emailRegex = /^\S+@\S+\.\S+$/;
  const history = useHistory();

  React.useEffect(() => {
    if (isLogin) {
      getMoviesInfo();
    }
  }, [isLogin]);

  function handleRegistration(authData) {
    history.push(routes.signIn);
  }

  function hanldeAthorization(authData) {
    const { email, password } = authData;
    setCurrentUser(authData);
    setIsLogin(true);
    history.push(routes.movies);
  }

  function logoutUserProfile() {
    history.push(routes.signIn);
    setIsLogin(false);
    setCurrentUser({});
  }

  async function getMoviesInfo() {
    try {
      const moviesInfo = await getMovies();
      setAllMovies(moviesInfo);
    } catch (e) {
      console.error(e);
    }
  }

  function searchMovie(searchData) {
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
    const res = allMovies.filter((movie) =>
      JSON.stringify(movie).toLowerCase().includes(searchString)
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

  return (
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
            onSearchSubmit={searchMovie}
            isLoading={isLoading}
            searchFormEmptyErrorText={searchFormEmptyErrorText}
            searchFormNotFoundErrorText={searchFormNotFoundErrorText}
            isSearchFilmEmptyError={isSearchFilmEmptyError}
            setIsSearchFilmEmptyError={setIsSearchFilmEmptyError}
            isSearchFilmNotFoundError={isSearchFilmNotFoundError}
            setIsSearchFilmNotFoundError={setIsSearchFilmNotFoundError}
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
          <Profile userData={currentUser} onLogout={logoutUserProfile} />
        </>
      </ProtectedRoute>
      <Route exact path={routes.baseRoute}>
        <Header isLogin={isLogin} />
        <Main />
        <Footer />
      </Route>
      <Route exact path={routes.signUp}>
        <Register onRegistrationSubmit={handleRegistration} />
      </Route>
      <Route exact path={routes.signIn}>
        <Login onAthorizationSubmit={hanldeAthorization} />
      </Route>
      <Route exact path={routes.notFound}>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
