import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-centering">
      <div className="footer">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__container">
          <p className="footer__data">© 2022</p>
          <div className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link footer__link_yandex"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/"
              className="footer__link footer__link_github"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
