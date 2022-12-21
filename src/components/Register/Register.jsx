import "./Register.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import { routes } from "../../utils/routes";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Register(props) {
  const { onRegistrationSubmit, nameRegex, emailRegex } = props;
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});

  function handleSubmit(event) {
    event.preventDefault();
    onRegistrationSubmit(values);
    resetForm();
  }
  return (
    <RegistrationForm
      title={"Добро пожаловать!"}
      name={"register-form"}
      buttonText={"Зарегистрироваться"}
      onSubmit={handleSubmit}
      isValid={isValid}
      redirect={"register"}
      linkAdress={routes.signIn}
    >
      <label className="form__input-label" htmlFor="name-register-input">
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
        pattern={nameRegex}
        onChange={handleChange}
      />
      <span
        className={
          isValid
            ? "form__input-error"
            : "form__input-error form__input-error_active"
        }
      >
        {errors["name"]}
      </span>
      <label className="form__input-label" htmlFor="email-register-input">
        E-mail
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
      <label className="form__input-label" htmlFor="password-register-input">
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

export default Register;
