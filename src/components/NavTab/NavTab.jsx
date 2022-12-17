import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";
import { routes } from "../../utils/routes";

function NavTab(props) {
  return (
    <div className="promo-nav">
      <Link
        to={routes.signUp}
        className="promo-nav__link promo-nav__link_register"
      >
        Регистрация
      </Link>
      <Link
        to={routes.signIn}
        className="promo-nav__link promo-nav__link_login"
      >
        Войти
      </Link>
    </div>
  );
}

export default NavTab;
