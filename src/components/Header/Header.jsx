import React from "react";
import headerLogo from "../../images/header__logo.svg";
import headerButtonIcon from "../../images/header__button-icon.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="Logo" />
        <Navigation />
      </div>
      <button className="header__button">
        <p className="header__button-text">Аккаунт</p>
        <img
          className="header__button-icon"
          src={headerButtonIcon}
          alt="Account icon"
        />
      </button>
    </header>
  );
}

export default Header;
