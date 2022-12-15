import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { routes } from "../../utils/routes";

function Navigation(props) {
  const { open } = props;
  return (
    <nav className={!open ? "navigation" : "navigation navigation_active"}>
      <ul className="navigation__list">
        <li className="navigation__item navigation__burger-item navigation__burger-item_active">
          <Link
            to={routes.baseRoute}
            className="navigation__link navigation__link_indent"
          >
            Главная
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to={routes.movies}
            className="navigation__link navigation__link_indent"
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link to={routes.savedMovies} className="navigation__link">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
