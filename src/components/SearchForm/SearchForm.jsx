import "./SearchForm.css";
import searchLoupe from "../../images/search__logo.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { useForm } from "../../hooks/useForm.js";

function SearchForm(props) {
  const {
    onSearchSubmit,
    searchFormEmptyErrorText,
    searchFormNotFoundErrorText,
    isSearchFilmEmptyError,
    setIsSearchFilmEmptyError,
    isSearchFilmNotFoundError,
    setIsSearchFilmNotFoundError,
  } = props;
  const { values, handleChange } = useForm({});
  const isErrorShown = isSearchFilmEmptyError || isSearchFilmNotFoundError;
  let errorMessage = "";
  if (isSearchFilmEmptyError) {
    errorMessage = searchFormEmptyErrorText;
  } else if (isSearchFilmNotFoundError) {
    errorMessage = searchFormNotFoundErrorText;
  }

  function onChange(event) {
    handleChange(event);
    setIsSearchFilmEmptyError(false);
    setIsSearchFilmNotFoundError(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    onSearchSubmit(values);
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
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
