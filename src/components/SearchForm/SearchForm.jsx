import React from "react";
import "./SearchForm.css";
import searchLoupe from "../../images/search__logo.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { errors } from "../../utils/constants";

function SearchForm(props) {
  const { onSubmit, searchString, isShortFilm, searchError } = props;

  const { values, handleInputChange } = useFormWithValidation({
    searchString: searchString || "",
    isShortFilm: isShortFilm || false,
  });

  const errorMessage = Boolean(searchError) ? (
    <span className={"search__input-error search__input-error_active"}>
      {errors[searchError]}
    </span>
  ) : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values.searchString, values.isShortFilm);
  };

  const handleIsShortFilmChange = (event) => {
    handleInputChange(event);
    onSubmit(values.searchString, !values.isShortFilm);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search-form"
          action="#"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="search__input"
            name="searchString"
            type="text"
            placeholder="Фильм"
            required
            value={values.searchString}
            onChange={handleInputChange}
          />
          {errorMessage}
          <button className="search__button" type="submit">
            <img className="search__logo" src={searchLoupe} alt="Loupe" />
          </button>
          <FilterCheckbox
            value={values.isShortFilm}
            onChange={handleIsShortFilmChange}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
