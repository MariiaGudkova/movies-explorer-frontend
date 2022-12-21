import "./Login.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { routes } from "../../utils/routes";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Login(props) {
  const { onAthorizationSubmit, emailRegex } = props;
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});
  function handleSubmit(event) {
    event.preventDefault();
    onAthorizationSubmit(values);
    resetForm();
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
    >
      <label className="form__input-label" htmlFor="email-login-input">
        E-mail
      </label>
      <input
        className="form__input form__input_email"
        id="email-login-input"
        type="email"
        name="email"
        placeholder=""
        required
        minLength="6"
        maxLength="64"
        pattern={emailRegex}
        onChange={handleChange}
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
        className="form__input form__input_password"
        id="password-login-input"
        type="password"
        name="password"
        placeholder=""
        required
        minLength="6"
        maxLength="32"
        autoComplete="off"
        onChange={handleChange}
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
