import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="paragraphs-container">
          <div className="paragraph">
            <h3 className="paragraph__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="paragraph__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="paragraph">
            <h3 className="paragraph__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="paragraph__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="timescale">
          <div className="timescale__segment timescale__segment_short">
            <p className="timescale__description timescale__description_back">
              1 неделя
            </p>
            Back-end
          </div>
          <div className="timescale__segment timescale__segment_long">
            <p className="timescale__description timescale__description_front">
              4 недели
            </p>
            Front-end
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
