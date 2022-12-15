import "./SearchForm.css";
import searchLoupe from "../../images/search__logo.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search-form"
          action="#"
          autoComplete="off"
          noValidate
          onSubmit={() => {}}
        >
          <input
            className="search__input"
            name="search-input"
            type="text"
            placeholder="Фильм"
          />
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
