import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const {
    setIsChecked,
    setSearchString,
    isLocalStorageChecked,
    setIsLocalStorageChecked,
    isPageSavedMovies,
  } = props;

  function onChange(e) {
    const val = e.target.checked;
    if (!isPageSavedMovies) {
      setIsLocalStorageChecked(val);
      setSearchString(localStorage.getItem("searchString").toLowerCase());
    }
    setIsChecked(val);
  }
  return (
    <div className="search__checkbox-container">
      <input
        className="search__checkbox"
        type="checkbox"
        id="search-checkbox"
        checked={!isPageSavedMovies ? isLocalStorageChecked : undefined}
        value={isLocalStorageChecked}
        onChange={onChange}
      />
      <label className="search__checkbox-label" htmlFor="search-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
