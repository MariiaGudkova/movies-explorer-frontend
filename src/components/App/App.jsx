import React from "react";
import { Route, Switch } from "react-router-dom";
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

function App() {
  const [isLogged, setIsLogged] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const savedMovies = movies.filter((movie) => movie.isSaved === true);
  const emailRegex = /^\S+@\S+\.\S+$/;
  return (
    <Switch>
      <ProtectedRoute exact path={routes.movies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <Movies movies={movies} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <SavedMovies movies={savedMovies} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.profile} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <Profile />
        </>
      </ProtectedRoute>
      <Route exact path={routes.baseRoute}>
        <Header isLogged={isLogged} />
        <Main />
        <Footer />
      </Route>
      <Route exact path={routes.signUp}>
        <Register />
      </Route>
      <Route exact path={routes.signIn}>
        <Login />
      </Route>
      <Route exact path={routes.notFound}>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
