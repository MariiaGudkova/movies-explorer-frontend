import React from "react";
import "./AboutMe.css";
import photo from "../../images/info__photo.jpg";

function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="info">
          <div className="info__container">
            <h3 className="info__title">Мария</h3>
            <p className="info__subtitle">Фронтенд-разработчик, 28 лет</p>
            <p className="info__text">
              Я начинающий фронтенд-разработчик. Хочу научиться писать
              качественный код и принимать участие в разработке реальных
              проектов 🚀. Для макета: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
            <a
              className="info__link-github"
              href="https://github.com/MariiaGudkova"
            >
              Ссылка на мой Github
            </a>
          </div>
          <img src={photo} className="info__photo" alt="My face =)"></img>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
