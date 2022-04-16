import { useState, useEffect } from "react";
import service from "../../services/service";
import "./style.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  const getAllCharacters = async () => {
    try {
      const res = await service.get("characters");
      setCharacters(res);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        loading...
      </div>
    );
  else
    return (
      <div className="container">
        {characters.map((character) => (
          <section className="card col-3" key={character.char_id}>
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
                <section>name: {character.name}</section>
                <section>nickname: {character.nickname}</section>
                <section>birthday: {character.birthday}</section>
                <section>status: {character.status}</section>
              </section>
            </section>
          </section>
        ))}
      </div>
    );
}
