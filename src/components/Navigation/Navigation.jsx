import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { routes } from "../../utils/routes";

function Navigation(props) {
  const { open, onClick } = props;

  function handleClick() {
    onClick();
  }
  return (
    <nav className={!open ? "navigation" : "navigation navigation_active"}>
      <ul className="navigation__list">
        <li className="navigation__item navigation__burger-item navigation__burger-item_active">
          <Link
            to={routes.baseRoute}
            className="navigation__link navigation__link_indent"
            onClick={() => handleClick()}
          >
            Главная
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to={routes.movies}
            className="navigation__link navigation__link_indent"
            onClick={() => handleClick()}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to={routes.savedMovies}
            className="navigation__link"
            onClick={() => handleClick()}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
