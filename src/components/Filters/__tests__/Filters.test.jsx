import { render, screen, waitFor } from "@testing-library/react";
import { Filters } from "../index";
import userEvent from "@testing-library/user-event";

describe("Filters", () => {
  it("search input should filter by name and nickname", async () => {
    const filterSpy = jest.fn();
    render(
      <Filters
        characters={[
          {
            name: "char1",
            nickname: "char1 nickname",
            status: "active",
            birthday: "07-08-1993",
            char_id: 1,
          },
          {
            name: "char2",
            nickname: "char2 nickname",
            status: "deceased",
            birthday: "03-12-2002",
            char_id: 2,
          },
        ]}
        filterKey={null}
        sortKey={null}
        sortOrder="DESC"
        onFilterChange={filterSpy}
        onSortKeySelect={jest.fn()}
        onSortOrderToggle={jest.fn()}
      />
    );

    const searchInput = await screen.findByRole("searchbox", {
      name: /filter/i,
    });

    userEvent.type(searchInput, "char2");

    expect(filterSpy).toHaveBeenCalledWith("char2");
  });
  it("search input should sort by different criteria", async () => {
    const sortKeySpy = jest.fn();
    render(
      <Filters
        characters={[
          {
            name: "char1",
            nickname: "char1 nickname",
            status: "active",
            birthday: "07-08-1993",
            char_id: 1,
          },
          {
            name: "char2",
            nickname: "char2 nickname",
            status: "deceased",
            birthday: "03-12-2002",
            char_id: 2,
          },
        ]}
        filterKey={null}
        sortKey={null}
        sortOrder="DESC"
        onFilterChange={jest.fn()}
        onSortKeySelect={sortKeySpy}
        onSortOrderToggle={jest.fn()}
      />
    );

    const sortSelect = await screen.findByRole("combobox", {
      name: /sort by/i,
    });

    expect(screen.getAllByRole("option")).toHaveLength(4);

    userEvent.selectOptions(sortSelect, "birthday");

    expect(sortKeySpy).toHaveBeenCalledWith("birthday");
  });
  it("sort order button should be disabled when no sort key is selected", async () => {
    const sortOrderSpy = jest.fn();
    render(
      <Filters
        characters={[
          {
            name: "char1",
            nickname: "char1 nickname",
            status: "active",
            birthday: "07-08-1993",
            char_id: 1,
          },
          {
            name: "char2",
            nickname: "char2 nickname",
            status: "deceased",
            birthday: "03-12-2002",
            char_id: 2,
          },
        ]}
        filterKey={null}
        sortKey={null}
        sortOrder="DESC"
        onFilterChange={jest.fn()}
        onSortKeySelect={jest.fn()}
        onSortOrderToggle={sortOrderSpy}
      />
    );

    const sortOrderButton = await screen.findByRole("button", {
      name: /desc/i,
    });

    expect(sortOrderButton).toBeDisabled();
  });
});
