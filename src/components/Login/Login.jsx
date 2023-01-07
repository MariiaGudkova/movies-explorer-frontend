import "./Login.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { routes } from "../../utils/routes";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Login(props) {
  const { onLoginSubmit, emailRegex, serverError } = props;
  const { values, handleInputChange, errors, isValid } = useFormWithValidation(
    {}
  );
  function handleSubmit(event) {
    event.preventDefault();
    onLoginSubmit(values);
  }

  return (
    <RegistrationForm
      title={"Рады видеть!"}
      name={"login-form"}
      buttonText={"Войти"}
      onSubmit={handleSubmit}
      isValid={isValid}
      redirect={"login"}
      linkAdress={routes.signUp}
      serverError={serverError}
    >
      <label className="form__input-label" htmlFor="email-login-input">
        E-mail
      </label>
      <input
        className={
          !errors["email"]
            ? "form__input form__input_email"
            : "form__input form__input_error form__input_email"
        }
        id="email-login-input"
        type="email"
        name="email"
        placeholder=""
        required
        minLength="6"
        maxLength="64"
        value={values.email || ""}
        pattern={emailRegex}
        onChange={handleInputChange}
      />
      <span
        className={
          isValid
            ? "form__input-error"
            : "form__input-error form__input-error_active"
        }
      >
        {errors["email"]}
      </span>
      <label className="form__input-label" htmlFor="password-login-input">
        Пароль
      </label>
      <input
        className={
          !errors["password"]
            ? "form__input form__input_password-login"
            : "form__input form__input_error form__input_password-login"
        }
        id="password-login-input"
        type="password"
        name="password"
        placeholder=""
        required
        minLength="6"
        maxLength="32"
        value={values.password || ""}
        autoComplete="off"
        onChange={handleInputChange}
      />
      <span
        className={
          isValid
            ? "form__input-error"
            : "form__input-error form__input-error_active"
        }
      >
        {errors["password"]}
      </span>
    </RegistrationForm>
  );
}

export default Login;
