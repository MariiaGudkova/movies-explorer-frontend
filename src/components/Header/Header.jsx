import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/header__logo.svg";
import headerButtonIcon from "../../images/header__button-icon.svg";
import Navigation from "../Navigation/Navigation.jsx";
import NavTab from "../NavTab/NavTab";
import { routes } from "../../utils/routes";

function Header(props) {
  const { isLogin, isOpen, setIsOpen, onLogoutProfile } = props;
  const close = () => setIsOpen(false);
  const logout = () => onLogoutProfile();
  const location = useLocation();

  function onClick() {
    return setIsOpen(!isOpen);
  }

  return ({ isLogin } && location.pathname === routes.movies) ||
    location.pathname === routes.savedMovies ||
    location.pathname === routes.profile ? (
    <header className="header-centering">
      <div
        className={
          !isOpen ? "header-overlay" : "header-overlay header-overlay_active "
        }
      />
      <div className="header">
        <div className="header__container">
          <Link to={routes.baseRoute}>
            <img
              className="header__logo"
              src={headerLogo}
              alt="Logo"
              onClick={logout}
            />
          </Link>
          <Navigation open={isOpen} onClick={onClick} />
        </div>
        <Link
          to={routes.profile}
          className={
            !isOpen ? "header__button" : "header__button header__button_active"
          }
          onClick={onClick}
        >
          <p className="header__button-text">Аккаунт</p>
          <img
            className="header__button-icon"
            src={headerButtonIcon}
            alt="Account icon"
          />
        </Link>
        <ul
          className={
            !isOpen ? "header__burger header__burger_active" : "header__burger"
          }
          onClick={onClick}
        >
          <li className="header__burger-line"></li>
          <li className="header__burger-line"></li>
          <li className="header__burger-line"></li>
        </ul>
        <div
          className={
            !isOpen ? "header__menu" : "header__menu header__menu_active"
          }
        >
          <ul className="header__cross" onClick={close}>
            <li className="header__cross-line"></li>
            <li className="header__cross-line"></li>
          </ul>
        </div>
      </div>
    </header>
  ) : (
    <header className="header-centering header-centering_promo">
      <div className="header header_promo">
        <Link to={routes.baseRoute}>
          <img className="header__logo" src={headerLogo} alt="Logo" />
        </Link>
        <NavTab />
      </div>
    </header>
  );
}

export default Header;
