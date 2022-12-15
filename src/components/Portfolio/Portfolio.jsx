import "./Portfolio.css";
import portfolioArrow from "../../images/portfolio__arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio-container">
      <div className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://github.com/MariiaGudkova/react-mesto-api-full"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">Сервис Mesto</p>
              <img
                className="portfolio__arrow"
                src={portfolioArrow}
                alt="Arrow"
              />
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/MariiaGudkova/Messenger_front_Itransition"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">Мессенджер</p>
              <img
                className="portfolio__arrow"
                src={portfolioArrow}
                alt="Arrow"
              />
            </a>
          </li>
          <li className="portfolio__item portfolio__item_no-border">
            <a
              href="https://github.com/MariiaGudkova/Web_application_Itransition"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__subtitle">
                Сервис удаления и блокировки
              </p>
              <img
                className="portfolio__arrow"
                src={portfolioArrow}
                alt="Arrow"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;
