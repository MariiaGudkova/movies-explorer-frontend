import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationForm.css";
import formLogo from "../../images/header__logo.svg";
import { routes } from "../../utils/routes.js";

function RegistrationForm(props) {
  const {
    title,
    name,
    buttonText,
    redirect,
    linkAdress,
    onSubmit,
    isValid,
    children,
    serverError,
  } = props;

  const redirectText =
    redirect === "register"
      ? "Уже зарегистрированы?"
      : "Ещё не зарегистрированы?";
  const redirectLink = redirect === "register" ? "Войти" : "Регистрация";

  return (
    <main className="authorization">
      <div className="form-container">
        <Link className="form-container__logo" to={routes.baseRoute}>
          <img src={formLogo} alt="Logo" />
        </Link>
        <h1 className="form-container__title">{title}</h1>
        <form
          className={`form form_${name}`}
          name={name}
          action="#"
          autoComplete="off"
          noValidate
          onSubmit={onSubmit}
        >
          <fieldset className="form__fieldset">
            {children}
            <span className="form__server-error">{serverError}</span>
            <button
              className={
                isValid
                  ? `form__button form__button_${name}`
                  : `form__button form__button_disabled form__button_${name}`
              }
              type="submit"
              disabled={!isValid}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
        <div className="form-container__redirect-links">
          <span className="form-container__redirect-text">{redirectText}</span>
          <Link className="form-container__redirect-link" to={linkAdress}>
            {redirectLink}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default RegistrationForm;
