import { Link } from "react-router-dom";
import "./NotFound.css";
import { routes } from "../../utils/routes";

function NotFound() {
  return (
    <div className="error">
      <h1 className="error__title">404</h1>
      <p className="error__subtitle">Страница не найдена</p>
      <Link to={routes.baseRoute} className="error__redirect">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
