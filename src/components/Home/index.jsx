import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import "./style.css";

function sortByOrder(a, b, prop, order) {
  switch (order) {
    case "DESC": {
      return a[prop] < b[prop] ? -1 : 1;
    }
    case "ASC": {
      return a[prop] > b[prop] ? -1 : 1;
    }
    default:
      return 0;
  }
}

function sortAndFilter(array, sorts, filterKey) {
  // TODO: expensive clone
  let out = array.slice();

  // Apply sorts
  Object.keys(sorts).forEach((key) => {
    if (sorts[key] != null) {
      out = out.sort((a, b) => sortByOrder(a, b, key, sorts[key]));
    }
  });

  // Filter by name or nickname
  if (filterKey) {
    out = out.filter(
      (item) =>
        item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1 ||
        item.nickname.toLowerCase().indexOf(filterKey.toLowerCase()) > -1
    );
  }

  return out;
}

export default function Home() {
  const navigate = useNavigate();
  const initialState = {
    isLoading: true,
    characters: [],
    originalCharacters: [],
    // TODO: initialize from local storage
    // Sort state = ASC | DESC | null = null
    sorts: {
      name: "",
      nickname: "",
      birthday: "",
    },
    filterByNameKey: "",
  };
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "TOGGLE_LOADING": {
        return { ...state, isLoading: action.isLoading };
      }
      case "CHARACTERS": {
        return {
          ...state,
          characters: action.characters,
          originalCharacters: action.characters,
        };
      }
      case "FILTER_BY_NAME_NICKNAME": {
        return {
          ...state,
          filterByNameKey: action.value,
          characters: sortAndFilter(
            state.originalCharacters,
            state.sorts,
            action.value
          ),
        };
      }
      case "SORT": {
        const newSorts = {
          ...state.sorts,
          // Cancel a sort order on sending the same order twice in a row
          [action.by]:
            state.sorts[action.by] === action.order
              ? null
              : action.order || null,
        };
        return {
          ...state,
          sorts: newSorts,
          characters: sortAndFilter(
            state.originalCharacters,
            newSorts,
            state.filters
          ),
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    service
      .get("characters")
      .then((res) => {
        dispatch({ type: "CHARACTERS", characters: res });
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        dispatch({ type: "TOGGLE_LOADING", isLoading: false });
      });
  }, []);

  console.log(state);

  if (state.isLoading) return <p className="center">loading...</p>;
  else
    return (
      <>
        <div className="form-card">
          <div className="input-wrapper col-3">
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
          <div className="input-wrapper col-3">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              className="field"
              defaultValue={0}
              onChange={(order) => dispatch({ type: "SORT", by: order, order })}
            >
              <option value="0" disabled>
                choose...
              </option>
              <option value="name">name</option>
              <option value="nickname">nickname</option>
              <option value="birthday">birthday</option>
            </select>
          </div>
          <div className="col-3">
            <button className="sort-btn col-12">desc/asc</button>
          </div>
        </div>
        <div className="container">
          {state.characters.map((character) => (
            <article
              className="card col-3"
              key={character.char_id}
              onClick={() => navigate(`/quotes/${character.name}`)}
            >
              <section className="card-content col-12">
                <section className="col-6">
                  <img
                    src={character.img}
                    className="avatar"
                    alt={character.name}
                    loading="lazy"
                  />
                </section>
                <section className="col-6 info">
                  <section>
                    <p>name: {character.name}</p>
                  </section>
                  <section>
                    <p>nickname: {character.nickname}</p>
                  </section>
                  <section>
                    <p>birthday: {character.birthday}</p>
                  </section>
                  <section>
                    <p>status: {character.status}</p>
                  </section>
                </section>
              </section>
            </article>
          ))}
        </div>
      </>
    );
}
