import React from "react";
import "./Profile.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Profile(props) {
  const { userData, nameRegex, emailRegex, onLogout, serverErrorMessage } =
    props;
  let [isDisabled, setIsDisabled] = React.useState(true);
  let [isChangeButtons, setIsChangeButtons] = React.useState(true);
  let [isSavedButton, setIsSavedButton] = React.useState(false);
  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});
  let saveButtonClass = isValid
    ? "profile-form__save-button"
    : "profile-form__save-button profile-form__save-button_disabled";

  if (isSavedButton) {
    saveButtonClass = isValid
      ? "profile-form__save-button_active"
      : "profile-form__save-button_active profile-form__save-button_disabled";
  }

  React.useEffect(() => {
    setValues(userData);
  }, [setValues, userData]);

  function onClick() {
    setIsDisabled(false);
    setIsChangeButtons(false);
    setIsSavedButton(true);
  }

  return (
    <main className="profile">
      <form className="profile-form">
        <h1 className="profile-form__title">Привет, {userData.name}!</h1>
        <fieldset className="profile-form__fieldset">
          <div className="profile-form__container">
            <label className="profile-form__label" htmlFor="name-profile-input">
              Имя
            </label>
            <input
              className={
                !errors["name"]
                  ? "profile-form__input profile-form__input_name"
                  : "profile-form__input profile-form__input_error profile-form__input_name"
              }
              id="name-profile-input"
              type="text"
              name="name"
              value={values.name || ""}
              required
              minLength="2"
              maxLength="30"
              pattern={nameRegex}
              disabled={isDisabled}
              onChange={handleChange}
            />
            <span
              className={
                isValid
                  ? "profile-form__input-error"
                  : "profile-form__input-error profile-form__input-error_active"
              }
            >
              {errors["name"]}
            </span>
          </div>
          <div className="profile-form__container profile-form__container_no-border">
            <label
              className="profile-form__label"
              htmlFor="email-profile-input"
            >
              E-mail
            </label>
            <input
              className={
                !errors["email"]
                  ? "profile-form__input"
                  : "profile-form__input profile-form__input_error"
              }
              id="email-profile-input"
              type="email"
              name="email"
              value={values.email || ""}
              required
              minLength="6"
              maxLength="64"
              pattern={emailRegex}
              disabled={isDisabled}
              onChange={handleChange}
            />
            <span
              className={
                isValid
                  ? "profile-form__input-error"
                  : "profile-form__input-error profile-form__input-error_active"
              }
            >
              {errors["email"]}
            </span>
          </div>
        </fieldset>
        <div
          className={
            isChangeButtons
              ? "profile-form__buttons_active"
              : "profile-form__buttons"
          }
        >
          <button
            className="profile-form__button profile-form__button_edit"
            type="button"
            onClick={() => {
              onClick();
            }}
          >
            Редактировать
          </button>
          <button
            className="profile-form__button profile-form__button_exit"
            type="button"
            onClick={() => {
              onLogout();
            }}
          >
            Выйти из аккаунта
          </button>
        </div>
        <span className="profile-form__server-error">{serverErrorMessage}</span>
        <button className={saveButtonClass} type="submit" disabled={!isValid}>
          Сохранить
        </button>
      </form>
    </main>
  );
}

export default Profile;
