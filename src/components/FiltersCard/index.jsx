import "./style.css";

export default function FiltersCard({ state, dispatch }) {
  return (
    <div className="form-card">
      <div className="input-wrapper col-xs-12 col-3">
        <label htmlFor="filter">Filter:</label>
        <input
          className="field"
          type="text"
          id="filter"
          name="name"
          placeholder="Name or Nickname"
          defaultValue={state.filterByNameKey}
          onChange={(e) =>
            dispatch({
              type: "FILTER_BY_NAME_NICKNAME",
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="input-wrapper col-xs-12 col-3">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="field"
          defaultValue={0}
          onChange={(e) =>
            dispatch({ type: "SORT_KEY", value: e.target.value })
          }
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
          className="sort-btn col-12"
          onClick={() => {
            dispatch({ type: "TOGGLE_SORT_ORDER" });
          }}
        >
          {state.sortOrder}
        </button>
      </div>
    </div>
  );
}
