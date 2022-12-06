import React from "react";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav class="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <a href="#" className="navigation__link navigation__link_indent">
            Фильмы
          </a>
        </li>
        <li className="navigation__item">
          <a href="#" className="navigation__link">
            Сохраненные фильмы
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
