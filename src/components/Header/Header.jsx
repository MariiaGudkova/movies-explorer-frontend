import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/header__logo.svg";
import headerButtonIcon from "../../images/header__button-icon.svg";
import Navigation from "../Navigation/Navigation.jsx";
import NavTab from "../NavTab/NavTab";
import { routes } from "../../utils/routes";

function Header(props) {
  const { isLogin, isOpen, setIsOpen } = props;
  const close = () => setIsOpen(false);
  const location = useLocation();

  function onClick() {
    return setIsOpen(!isOpen);
  }

  if (isLogin)
    return (
      <header
        className={
          location.pathname !== routes.baseRoute
            ? "header-centering"
            : "header-centering header-centering_promo"
        }
      >
        <>
          <div
            className={
              !isOpen
                ? "header-overlay"
                : "header-overlay header-overlay_active "
            }
          />
          <div
            className={
              location.pathname !== routes.baseRoute
                ? "header"
                : "header header_promo"
            }
          >
            <div className="header__container">
              <Link to={routes.baseRoute}>
                <img className="header__logo" src={headerLogo} alt="Logo" />
              </Link>
              <Navigation isOpen={isOpen} onClick={onClick} />
            </div>
            <Link
              to={routes.profile}
              className={
                !isOpen
                  ? "header__button"
                  : "header__button header__button_active"
              }
              onClick={onClick}
            >
              <p className="header__button-text">Аккаунт</p>
              <img
                className={
                  location.pathname !== routes.baseRoute
                    ? "header__button-icon"
                    : "header__button-icon header__button-icon_promo"
                }
                src={headerButtonIcon}
                alt="Account icon"
              />
            </Link>
            <ul
              className={
                !isOpen
                  ? "header__burger header__burger_active"
                  : "header__burger"
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
        </>
      </header>
    );
  return (
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
