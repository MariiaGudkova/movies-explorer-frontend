import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="search__checkbox-container">
      <input
        className="search__checkbox"
        type="checkbox"
        id="search-checkbox"
      />
      <label className="search__checkbox-label" htmlFor="search-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
