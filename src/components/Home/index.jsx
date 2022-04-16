import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();
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

  if (isLoading) return <div className="center-loading">loading...</div>;
  else
    return (
      <div className="container">
        {characters.map((character) => (
          <article
            className="card col-3"
            key={character.char_id}
            onClick={() => navigate(`/quotes/${character.char_id}`)}
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
    );
}
