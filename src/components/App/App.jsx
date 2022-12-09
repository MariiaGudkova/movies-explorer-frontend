import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { routes } from "../../utils/routes";
import Header from "../Header/Header.jsx";
import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutMe from "../AboutMe/AboutMe";

function App() {
  const [isLogged, setIsLogged] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  return (
    <Switch>
      <ProtectedRoute exact path={routes.movies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.profile} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
        </>
      </ProtectedRoute>
      <Route exact path={routes.baseRoute}>
        <Promo isLogged={isLogged} />
        <AboutProject />
        <Techs />
        <AboutMe />
      </Route>
      <Route exact path={routes.signUp}></Route>
      <Route exact path={routes.signIn}></Route>
    </Switch>
  );
}

export default App;
