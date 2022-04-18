import { toggleSortOrder } from "./utils";

describe("utils", () => {
  describe("toggleSortOrder", () => {
    it("should return null when no sort order is provided", () => {
      expect(toggleSortOrder()).toBe(null);
    });
    it("should return null when invalid sort order is provided", () => {
      expect(toggleSortOrder("random invalid order")).toBe(null);
    });
    it("should return DESC when current order is ASC", () => {
      expect(toggleSortOrder("ASC")).toBe("DESC");
    });
    it("should return ASC when current order is DESC", () => {
      expect(toggleSortOrder("DESC")).toBe("ASC");
    });
  });
});
