import "./style.css";

export function Filters({
  filterKey,
  onFilterChange,
  onSortKeySelect,
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
          type="search"
          id="filter"
          name="name"
          placeholder="Name or Nickname"
          defaultValue={filterKey}
          onChange={(e) => {
            onFilterChange(e.target.value);
          }}
        />
      </div>
      <div className="input-wrapper col-xs-12 col-3">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="field"
          defaultValue={0}
          onChange={(e) => {
            onSortKeySelect(e.target.value);
          }}
        >
          <option value="">choose...</option>
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
