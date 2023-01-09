import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const { value, onChange } = props;

  return (
    <div className="search__checkbox-container">
      <input
        name="isShortFilm"
        className="search__checkbox"
        type="checkbox"
        id="search-checkbox"
        checked={value}
        onChange={onChange}
      />
      <label className="search__checkbox-label" htmlFor="search-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
