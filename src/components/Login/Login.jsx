import "./Login.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { routes } from "../../utils/routes";
import { useForm } from "../../hooks/useForm.js";

function Login(props) {
  const { emailRegex, onAthorizationSubmit } = props;
  const { values, handleChange, setValues } = useForm({});
  function handleSubmit(event) {
    event.preventDefault();
    onAthorizationSubmit(values);
  }
  return (
    <RegistrationForm
      title={"Рады видеть!"}
      name={"login-form"}
      buttonText={"Войти"}
      onSubmit={handleSubmit}
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
        mask={emailRegex}
        onChange={handleChange}
      />
      <span className="form__input-error email-input-error"></span>
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
      <span className="form__input-error form__input-error_active  login-password-input-error">
        Ошибка валидации
      </span>
    </RegistrationForm>
  );
}

export default Login;
