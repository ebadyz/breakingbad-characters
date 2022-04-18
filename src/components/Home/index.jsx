import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import { Filters } from "../Filters";
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

function toggleSortOrder(currentOrder) {
  switch (currentOrder) {
    case "ASC": {
      return "DESC";
    }
    case "DESC": {
      return "ASC";
    }
    default: {
      return null;
    }
  }
}

function sortAndFilter(array, sortKey, sortOrder, filterKey) {
  let out = array.slice();

  // Apply sort
  out = out.sort((a, b) => sortByOrder(a, b, sortKey, sortOrder));

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
    sortKey: null,
    sortOrder: "DESC",
    filterByNameKey: "",
  };
  const reducer = (state, action) => {
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
            state.sortOrder,
            state.sortKey,
            action.value
          ),
        };
      }
      case "SORT_KEY": {
        return {
          ...state,
          sortKey: action.value,
          characters: sortAndFilter(
            state.originalCharacters,
            action.value,
            state.sortOrder,
            state.filterByNameKey
          ),
        };
      }
      case "TOGGLE_SORT_ORDER": {
        const sortOrder = toggleSortOrder(state.sortOrder);
        return {
          ...state,
          sortOrder,
          characters: sortAndFilter(
            state.originalCharacters,
            state.sortKey,
            sortOrder,
            state.filterByNameKey
          ),
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCharacters = async () => {
    try {
      const res = await service.getCharacters();
      dispatch({ type: "CHARACTERS", characters: res });
    } catch (err) {
      console.warn(err);
    } finally {
      dispatch({ type: "TOGGLE_LOADING", isLoading: false });
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  if (state.isLoading) return <p className="center">loading...</p>;
  else
    return (
      <>
        <Filters
          filterKey={state.filterByNameKey}
          onFilterChange={(e) =>
            dispatch({
              type: "FILTER_BY_NAME_NICKNAME",
              value: e.target.value,
            })
          }
          onSortSelect={(e) =>
            dispatch({ type: "SORT_KEY", value: e.target.value })
          }
          onSortOrderToggle={() => {
            dispatch({ type: "TOGGLE_SORT_ORDER" });
          }}
          sortOrder={state.sortOrder}
        />
        <main className="container">
          {state.characters.map((character) => (
            <article
              className="card col-xs-12 col-sm-6 col-3"
              key={character.char_id}
              onClick={() => navigate(`/quotes/${character.name}`)}
            >
              <section className="card-content col-12">
                <section className="col-xs-12 col-6">
                  <img
                    src={character.img}
                    className="avatar"
                    alt={character.name}
                    loading="lazy"
                  />
                </section>
                <section className="col-xs-12 col-6 info">
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
        </main>
      </>
    );
}
