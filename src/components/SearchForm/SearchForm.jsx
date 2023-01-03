import React from "react";
import "./SearchForm.css";
import searchLoupe from "../../images/search__logo.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useLocalStorage } from "../../hooks/useLocalStorageValues";

function SearchForm(props) {
  const {
    searchFormEmptyErrorText,
    searchFormNotFoundErrorText,
    isSearchMovieEmptyError,
    setIsSearchMovieEmptyError,
    isSearchMovieNotFoundError,
    setIsSearchMovieNotFoundError,
    isChecked,
    setIsChecked,
    setSearchString,
    setIsSavedMoviesFilter,
    isPageSavedMovies,
  } = props;
  const { handleChange } = useFormWithValidation({});
  const [localStorageSearchText, setLocalStorageSearchText] = useLocalStorage(
    "searchString",
    ""
  );
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useLocalStorage(
    "isChecked",
    false
  );

  const isErrorShown = isSearchMovieEmptyError || isSearchMovieNotFoundError;
  let errorMessage = "";
  if (isSearchMovieEmptyError) {
    errorMessage = searchFormEmptyErrorText;
  } else if (isSearchMovieNotFoundError) {
    errorMessage = searchFormNotFoundErrorText;
  }

  function onChange(event) {
    setIsSearchMovieEmptyError(false);
    setIsSearchMovieNotFoundError(false);
    if (!isPageSavedMovies) {
      setLocalStorageSearchText(event.target.value);
    }
    handleChange(event);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (
      isPageSavedMovies
        ? setIsSavedMoviesFilter(true)
        : setIsSavedMoviesFilter(false)
    );
    const form = document.querySelector(".search__form");
    const input = form.querySelector(".search__input");
    setSearchString(input.value.toLowerCase());
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search-form"
          action="#"
          autoComplete="off"
          noValidate
          onSubmit={onSubmit}
        >
          <input
            className="search__input"
            name="searchString"
            type="text"
            placeholder="Фильм"
            required
            value={!isPageSavedMovies ? localStorageSearchText : undefined}
            onChange={onChange}
          />
          <span
            className={
              !isErrorShown
                ? "search__input-error"
                : "search__input-error search__input-error_active"
            }
          >
            {errorMessage}
          </span>
          <button className="search__button" type="submit">
            <img className="search__logo" src={searchLoupe} alt="Loupe" />
          </button>
          <FilterCheckbox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setSearchString={setSearchString}
            isLocalStorageChecked={isLocalStorageChecked}
            setIsLocalStorageChecked={setIsLocalStorageChecked}
            isPageSavedMovies={isPageSavedMovies}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
