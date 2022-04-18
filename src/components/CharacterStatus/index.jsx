import "./styles.css";
import classnames from "classnames";

const statusToClassName = {
  alive: "success",
  deceased: "danger",
  "presumed dead": "warning",
};

export function CharacterStatus({ status }) {
  return (
    <span
      className={classnames(
        statusToClassName[status.toLowerCase()],
        "character-status"
      )}
    >
      {status}
    </span>
  );
}
