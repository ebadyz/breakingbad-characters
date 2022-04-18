import "./style.css";

export function Filters({
  filterKey,
  onFilterChange,
  onSortSelect,
  onSortOrderToggle,
  sortOrder,
  sortKey,
}) {
  return (
    <header className="form-card">
      <div className="input-wrapper col-xs-12 col-3">
        <label htmlFor="filter">Filter</label>
        <input
          className="field"
          type="text"
          id="filter"
          name="name"
          placeholder="Name or Nickname"
          defaultValue={filterKey}
          onChange={onFilterChange}
        />
      </div>
      <div className="input-wrapper col-xs-12 col-3">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="field"
          defaultValue={0}
          onChange={onSortSelect}
        >
          <option value="0" disabled>
            choose...
          </option>
          <option value="name">name</option>
          <option value="nickname">nickname</option>
          <option value="birthday">birthday</option>
        </select>
      </div>
      <div className="col-xs-12 col-3">
        <button
          disabled={!sortKey}
          className="btn sort-btn col-12"
          onClick={onSortOrderToggle}
        >
          {sortOrder}
        </button>
      </div>
    </header>
  );
}
