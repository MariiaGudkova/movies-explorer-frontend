import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/header__logo.svg";
import headerButtonIcon from "../../images/header__button-icon.svg";
import Navigation from "../Navigation/Navigation.jsx";
import { routes } from "../../utils/routes";

function Header(props) {
  const { open, setOpen } = props;
  const close = () => setOpen(false);

  function onClick() {
    return setOpen(!open);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to={routes.baseRoute}>
          <img className="header__logo" src={headerLogo} alt="Logo" />
        </Link>
        <Navigation open={open} />
      </div>
      <Link
        to={routes.profile}
        className={!open ? "header__button" : "header__button_active"}
      >
        <p className="header__button-text">Аккаунт</p>
        <img
          className="header__button-icon"
          src={headerButtonIcon}
          alt="Account icon"
        />
      </Link>
      <ul
        className={!open ? "header__burger_active" : "header__burger"}
        onClick={onClick}
      >
        <li className="header__burger-line"></li>
        <li className="header__burger-line"></li>
        <li className="header__burger-line"></li>
      </ul>
      <div className={!open ? "header__menu" : "header__menu_active"}>
        <ul className="header__cross" onClick={close}>
          <li className="header__cross-line"></li>
          <li className="header__cross-line"></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
