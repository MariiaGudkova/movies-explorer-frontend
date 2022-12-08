import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="paragraphs-container">
          <div className="about-project__paragraph">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__paragraph">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__scale">
          <div className="about-project__scale-segment about-project__scale-segment_short">
            <p className="about-project__segment_back">1 неделя</p>
            <p>Back-end</p>
          </div>
          <div className="about-project__scale-segment about-project__scale-segment_lang">
            <p className="about-project__segment_front">4 недели</p>
            <p>Front-end</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
