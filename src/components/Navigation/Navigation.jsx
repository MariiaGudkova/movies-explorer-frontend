import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { routes } from "../../utils/routes";

function Navigation(props) {
  const { isOpen, onClick } = props;
  const location = useLocation();
  const isMoviesActive = location.pathname === routes.movies;
  const isSavedMoviesActive = location.pathname === routes.savedMovies;
  function handleClick() {
    onClick();
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        onClick();
      }
    }

    function closeByClickAnywhere(evt) {
      const menu = document.querySelector(".header__menu_active");
      const burger = document.querySelector(".header__burger");
      if (evt.target !== menu && evt.target !== burger) {
        onClick();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("click", closeByClickAnywhere);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("click", closeByClickAnywhere);
      };
    }
  }, [isOpen, onClick]);

  return (
    <nav className={!isOpen ? "navigation" : "navigation navigation_active"}>
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
