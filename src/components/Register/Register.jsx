import "./Register.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { routes } from "../../utils/routes";

function Register(props) {
  const { emailRegex } = props;
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <RegistrationForm
      title={"Добро пожаловать!"}
      name={"register-form"}
      buttonText={"Зарегистрироваться"}
      onSubmit={handleSubmit}
      redirect={"register"}
      linkAdress={routes.signIn}
    >
      <label className="form__input-label" htmlFor="name">
        Имя
      </label>
      <input
        className="form__input form__input_name"
        id="name-register-input"
        type="text"
        name="name"
        placeholder=""
        required
        minLength="2"
        maxLength="30"
        onChange={() => {}}
      />
      <span className="form__input-error name-input-error"></span>
      <label className="form__input-label" htmlFor="email">
        Email
      </label>
      <input
        className="form__input form__input_email"
        id="email-register-input"
        type="email"
        name="email"
        placeholder=""
        required
        minLength="6"
        maxLength="64"
        mask={emailRegex}
        onChange={() => {}}
      />
      <span className="form__input-error email-input-error"></span>
      <label className="form__input-label" htmlFor="password">
        Пароль
      </label>
      <input
        className="form__input form__input_password"
        id="password-register-input"
        type="password"
        name="password"
        placeholder=""
        required
        minLength="6"
        maxLength="32"
        autoComplete="off"
        onChange={() => {}}
      />
      <span className="form__input-error form__input-error_active  password-input-error ">
        Ошибка валидации
      </span>
    </RegistrationForm>
  );
}

export default Register;
