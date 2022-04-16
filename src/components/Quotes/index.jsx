import { useParams } from "react-router-dom";

export default function Quotes() {
  const { characterId } = useParams();
  return <div>character ID is: {characterId}</div>;
}
