import "./Portfolio.css";
import portfolioArrow from "../../images/portfolio__arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio-container">
      <div className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <p className="portfolio__subtitle">Сервис Mesto</p>
            <a
              href="https://github.com/MariiaGudkova/react-mesto-api-full"
              className="portfolio__link"
            >
              <img
                className="portfolio__arrow"
                src={portfolioArrow}
                alt="Arrow"
              />
            </a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__subtitle">Мессенджер</p>
            <a
              href="https://github.com/MariiaGudkova/Messenger_front_Itransition"
              className="portfolio__link"
            >
              <img
                className="portfolio__arrow"
                src={portfolioArrow}
                alt="Arrow"
              />
            </a>
          </li>
          <li className="portfolio__item portfolio__item_no-border">
            <p className="portfolio__subtitle">Сервис удаления и блокировки</p>
            <a
              href="https://github.com/MariiaGudkova/Web_application_Itransition"
              className="portfolio__link"
            >
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
