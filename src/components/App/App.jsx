import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { routes } from "../../utils/routes.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";

function App() {
  const [isLogged, setIsLogged] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;
  return (
    <Switch>
      <ProtectedRoute exact path={routes.movies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <Footer />
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path={routes.profile} loggedIn={isLogged}>
        <>
          <div className={!open ? "overlay" : "overlay_active"} />
          <Header isLogged={isLogged} open={open} setOpen={setOpen} />
          <Footer />
        </>
      </ProtectedRoute>
      <Route exact path={routes.baseRoute}>
        <Main isLogged={isLogged} />
        <Footer />
      </Route>
      <Route exact path={routes.signUp}>
        <Register emailRegex={emailRegex} />
      </Route>
      <Route exact path={routes.signIn}>
        <Login emailRegex={emailRegex} />
      </Route>
    </Switch>
  );
}

export default App;
