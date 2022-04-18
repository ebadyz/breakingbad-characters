export function toggleSortOrder(currentOrder) {
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
