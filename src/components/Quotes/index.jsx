import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import "./style.css";

export default function Quotes() {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isWaiting, setWaiting] = useState(false);
  const [quote, setQuote] = useState({});

  const getRandomQuote = async () => {
    setWaiting(true);
    try {
      const res = await service.get(`quote/random?author=${name}`);
      setQuote(res[0]);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      setWaiting(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  if (isLoading) return <p className="center">loading...</p>;
  else
    return (
      <section className="center">
        <section className="quote-card">
          <h1>Quote:</h1>
          {isWaiting ? (
            <p className="vertical-spacing">loading...</p>
          ) : (
            <h4 className="vertical-spacing">{quote.quote}</h4>
          )}
          <button disabled={isWaiting} onClick={getRandomQuote} className="btn">
            Random quote
          </button>
        </section>
      </section>
    );
}
