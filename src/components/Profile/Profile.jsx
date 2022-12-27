import React from "react";
import "./Profile.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import Preloader from "../Preloader/Preloader.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    nameRegex,
    emailRegex,
    onLogout,
    serverErrorMessage,
    serverSuccessMessage,
    setServerSuccessMessage,
    isLoading,
    onUpdateUser,
  } = props;
  let [isEditMode, setisEditMode] = React.useState(false);
  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation({});

  const saveButtonClass =
    isEditMode && isValid
      ? "profile-form__save-button_active"
      : "profile-form__save-button_active profile-form__save-button_disabled";

  const saveButton = isEditMode ? (
    <button className={saveButtonClass} type="submit" disabled={!isValid}>
      Сохранить
    </button>
  ) : null;

  React.useEffect(() => {
    if (serverSuccessMessage && serverSuccessMessage.length > 0) {
      setTimeout(() => {
        return setServerSuccessMessage("");
      }, 3000);
    }
  }, [serverSuccessMessage, setServerSuccessMessage]);

  React.useEffect(() => {
    setValues(currentUser);
  }, [setValues, currentUser]);

  function onClickEditButton() {
    setisEditMode(true);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const success = await onUpdateUser(values);
    if (success) {
      setisEditMode(false);
    }
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <main className="profile">
      <form className="profile-form" onSubmit={onSubmit}>
        <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>
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
              disabled={!isEditMode}
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
              disabled={!isEditMode}
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
            !isEditMode
              ? "profile-form__buttons_active"
              : "profile-form__buttons"
          }
        >
          <span className="profile-form__server-succsess">
            {serverSuccessMessage}
          </span>
          <button
            className="profile-form__button profile-form__button_edit"
            type="button"
            onClick={() => {
              onClickEditButton();
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
        {saveButton}
      </form>
    </main>
  );
}

export default Profile;
