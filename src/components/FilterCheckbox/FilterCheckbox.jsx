import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const { setIsChecked } = props;

  function onChange(e) {
    const val = e.target.checked;
    return setIsChecked(val);
  }
  return (
    <div className="search__checkbox-container">
      <input
        className="search__checkbox"
        type="checkbox"
        id="search-checkbox"
        onChange={onChange}
      />
      <label className="search__checkbox-label" htmlFor="search-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
