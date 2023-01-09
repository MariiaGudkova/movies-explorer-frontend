import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "../../utils/routes";

function ProtectedFromDoubleRegisterRoute(props) {
  const { loggedIn, children } = props;
  return (
    <Route>
      {() => (!loggedIn ? children : <Redirect to={routes.movies} />)}
    </Route>
  );
}

export default ProtectedFromDoubleRegisterRoute;
