import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { routes } from "../../utils/routes";

function Navigation(props) {
  const { open, onClick } = props;
  const location = useLocation();
  const isMoviesActive = location.pathname === routes.movies;
  const isSavedMoviesActive = location.pathname === routes.savedMovies;
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
            className={
              isMoviesActive
                ? "navigation__link navigation__link_active navigation__link_indent"
                : "navigation__link navigation__link_indent"
            }
            onClick={() => handleClick()}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to={routes.savedMovies}
            className={
              isSavedMoviesActive
                ? "navigation__link navigation__link_active"
                : "navigation__link"
            }
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
