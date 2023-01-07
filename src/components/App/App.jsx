import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import ProtectedFromDoubleRegisterRoute from "../ProtectedFromDoubleRegisterRoute/ProtectedFromDoubleRegisterRoute.jsx";
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
import { register, login, getUser, updateUser } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});
  const [serverSuccessMessage, setServerSuccessMessage] = React.useState("");
  const history = useHistory();
  const location = useLocation();
  const nameRegex = "^[а-яА-ЯЁёa-zA-Z\\-\\s]+$";
  const emailRegex = "^\\S+@\\S+\\.\\S+$";

  React.useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

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
    history.push(routes.baseRoute);
    setIsLogin(false);
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
      setIsLoading(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path={routes.movies} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Movies />
            <Footer />
          </>
        </ProtectedRoute>
        <ProtectedRoute exact path={routes.savedMovies} loggedIn={isLogin}>
          <>
            <Header isLogin={isLogin} isOpen={isOpen} setIsOpen={setIsOpen} />
            <SavedMovies />
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
        <ProtectedFromDoubleRegisterRoute
          exact
          path={routes.signUp}
          loggedIn={isLogin}
        >
          <Register
            onRegistrationSubmit={handleRegistration}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            serverError={serverErrors.registration}
          />
        </ProtectedFromDoubleRegisterRoute>
        <ProtectedFromDoubleRegisterRoute
          exact
          path={routes.signIn}
          loggedIn={isLogin}
        >
          <Login
            onLoginSubmit={hanldeLogin}
            nameRegex={nameRegex}
            emailRegex={emailRegex}
            serverError={serverErrors.login}
          />
        </ProtectedFromDoubleRegisterRoute>
        <Route exact path={routes.notFound}>
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
