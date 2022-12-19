import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { routes } from "../../utils/routes.js";
import Header from "../Header/Header.jsx";
import { movies } from "../../utils/constants.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound";
import { getMovies } from "../../utils/MoviesApi.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogged, setIsLogged] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const savedMovies = movies.filter((movie) => movie.isSaved === true);
  const emailRegex = /^\S+@\S+\.\S+$/;
  const history = useHistory();

  React.useEffect(() => {
    if (isLogged) {
      getMoviesInfo();
    }
  }, [isLogged]);

  function handleRegistration(authData) {
    history.push(routes.signIn);
  }

  function hanldeAthorization(authData) {
    const { email, password } = authData;
    setCurrentUser(authData);
    setIsLogged(true);
    history.push(routes.movies);
  }

  function logoutUserProfile() {
    history.push(routes.signIn);
    setIsLogged(false);
    setCurrentUser({});
  }

  async function getMoviesInfo() {
    try {
      const moviesInfo = await getMovies();
      setMovies(moviesInfo);
    } catch (e) {
      console.error(e);
    }
  }

  function searchMovie(name) {}

  return (
    <Switch>
      <ProtectedRoute exact path={routes.movies} loggedIn={isLogged}>
        <>
          <Header
            isLogged={isLogged}
            open={open}
            setOpen={setOpen}
            onLogoutProfile={logoutUserProfile}
          />
          <Movies movies={movies} onSearchSubmit={searchMovie} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogged}>
        <>
          <Header
            isLogged={isLogged}
            open={open}
            setOpen={setOpen}
            onLogoutProfile={logoutUserProfile}
          />
          <SavedMovies movies={savedMovies} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.profile} loggedIn={isLogged}>
        <>
          <Header
            isLogged={isLogged}
            open={open}
            setOpen={setOpen}
            onLogoutProfile={logoutUserProfile}
          />
          <Profile userData={currentUser} onLogout={logoutUserProfile} />
        </>
      </ProtectedRoute>
      <Route exact path={routes.baseRoute}>
        <Header isLogged={isLogged} />
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
